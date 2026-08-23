"""Renders the DEPLOY forward-deployed-engineer sketch into looping MP4s.

    python tools/generate_sketch_video.py

Writes public/media/fde-sketch.mp4 (16:9 explainer) and public/media/hero-loop.mp4
(faint ambient version used behind the hero copy). Requires Pillow, numpy, ffmpeg.
"""

import math
import os
import shutil
import subprocess
import tempfile

from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 900
FPS = 24
DURATION = 22.0
SS = 2  # supersample factor

PAPER = (251, 251, 252)
INK = (29, 29, 31)
MUTED = (122, 122, 128)
BLUE = (0, 113, 227)
GRID = (222, 222, 227)

FONT_DIR = r"C:\Windows\Fonts"


def font(name, size):
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size * SS)


F_TITLE = None
F_SUB = None
F_LABEL = None
F_SMALL = None
F_MONO = None
F_LETTER = None
F_BIG = None


def load_fonts():
    global F_TITLE, F_SUB, F_LABEL, F_SMALL, F_MONO, F_LETTER, F_BIG
    F_TITLE = font("segoeuib.ttf", 44)
    F_SUB = font("segoeui.ttf", 21)
    F_LABEL = font("segoeuib.ttf", 19)
    F_SMALL = font("segoeui.ttf", 15)
    F_MONO = font("consolab.ttf", 13)
    F_LETTER = font("segoeuib.ttf", 40)
    F_BIG = font("segoeuib.ttf", 34)


# ----------------------------------------------------------------- geometry


def resample(pts, step=7.0):
    """Even out a polyline so jitter and progressive reveal behave predictably."""
    out = []
    for i in range(len(pts) - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        d = math.hypot(x1 - x0, y1 - y0)
        n = max(1, int(d / step))
        for k in range(n):
            f = k / n
            out.append((x0 + (x1 - x0) * f, y0 + (y1 - y0) * f))
    out.append(pts[-1])
    return out


def jitter(pts, seed, amount=1.5):
    """Perpendicular wobble so straight lines read as hand-drawn."""
    out = []
    n = len(pts)
    for i, (x, y) in enumerate(pts):
        if i == 0 or i == n - 1:
            out.append((x, y))
            continue
        px, py = pts[i - 1]
        nx, ny = pts[min(i + 1, n - 1)]
        dx, dy = nx - px, ny - py
        d = math.hypot(dx, dy) or 1.0
        ox, oy = -dy / d, dx / d
        phase = seed * 1.7 + i * 0.35
        w = (math.sin(phase) * 0.6 + math.sin(phase * 2.3 + 1.1) * 0.4) * amount
        out.append((x + ox * w, y + oy * w))
    return out


def rect_pts(x0, y0, x1, y1, r=18):
    pts = []
    corners = [
        (x1 - r, y0 + r, -90, 0),
        (x1 - r, y1 - r, 0, 90),
        (x0 + r, y1 - r, 90, 180),
        (x0 + r, y0 + r, 180, 270),
    ]
    pts.append((x0 + r, y0))
    for cx, cy, a0, a1 in corners:
        for a in range(a0, a1 + 1, 10):
            rad = math.radians(a)
            pts.append((cx + math.cos(rad) * r, cy + math.sin(rad) * r))
    pts.append((x0 + r, y0))
    return pts


def circle_pts(cx, cy, r, start=0, end=360):
    return [
        (cx + math.cos(math.radians(a)) * r, cy + math.sin(math.radians(a)) * r)
        for a in range(start, end + 1, 8)
    ]


def arc_pts(cx, cy, rx, ry, start, end):
    return [
        (cx + math.cos(math.radians(a)) * rx, cy + math.sin(math.radians(a)) * ry)
        for a in range(start, end + 1, 5)
    ]


# ----------------------------------------------------------------- drawing


def stroke(draw, pts, progress, color, width=2.4, seed=1.0, wobble=1.5, dash=None):
    """Draw a polyline revealed to `progress` (0..1) with a pencil-ish double pass."""
    if progress <= 0.001 or len(pts) < 2:
        return
    pts = resample([(x * SS, y * SS) for x, y in pts], step=7.0 * SS)
    keep = max(2, int(len(pts) * min(1.0, progress)))
    pts = pts[:keep]
    wobble *= SS

    for pass_i, (seed_off, alpha_mul, w_mul) in enumerate(
        ((0.0, 1.0, 1.0), (3.7, 0.32, 0.72))
    ):
        line = jitter(pts, seed + seed_off, wobble)
        col = color if pass_i == 0 else color[:3] + (int(color[3] * alpha_mul),)
        w = max(1, int(width * SS * w_mul))
        if dash:
            on, off = dash
            acc = 0.0
            seg = []
            drawing = True
            for i in range(len(line) - 1):
                seg.append(line[i])
                acc += math.hypot(line[i + 1][0] - line[i][0], line[i + 1][1] - line[i][1])
                limit = on if drawing else off
                if acc >= limit:
                    if drawing and len(seg) > 1:
                        draw.line(seg, fill=col, width=w, joint="curve")
                    seg = [line[i]]
                    acc = 0.0
                    drawing = not drawing
            if drawing and len(seg) > 1:
                draw.line(seg, fill=col, width=w, joint="curve")
        else:
            draw.line(line, fill=col, width=w, joint="curve")


def arrow(draw, p0, p1, progress, color, width=2.4, seed=1.0, head=13):
    stroke(draw, [p0, p1], progress, color, width, seed, wobble=1.1)
    if progress < 0.92:
        return
    ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0])
    for side in (-1, 1):
        a = ang + math.pi + side * 0.42
        tip = (p1[0] + math.cos(a) * head, p1[1] + math.sin(a) * head)
        stroke(draw, [p1, tip], 1.0, color, width, seed + side, wobble=0.6)


def text(draw, xy, label, fnt, color, alpha, anchor="la", rise=0.0):
    if alpha <= 0.01:
        return
    x, y = xy
    draw.text(
        (x * SS, (y + rise) * SS),
        label,
        font=fnt,
        fill=color[:3] + (int(255 * alpha),),
        anchor=anchor,
    )


def measure(draw, label, fnt):
    box = draw.textbbox((0, 0), label, font=fnt)
    return (box[2] - box[0]) / SS, (box[3] - box[1]) / SS


# ----------------------------------------------------------------- timing


def seg(t, t0, t1):
    if t <= t0:
        return 0.0
    if t >= t1:
        return 1.0
    p = (t - t0) / (t1 - t0)
    return 1 - math.pow(1 - p, 3)


def fade(t, t0, t1):
    return max(0.0, min(1.0, (t - t0) / max(0.001, t1 - t0)))


# ----------------------------------------------------------------- scene

LOOP = [
    ("D", "Detect", "the trigger"),
    ("E", "Enrich", "the context"),
    ("P", "Plan", "the decision"),
    ("L", "Link", "the systems"),
    ("O", "Operate", "in production"),
    ("Y", "Yield", "the result"),
]

SYSTEMS = ["CRM", "EMAIL", "DOCS", "APIs"]

RESULT_LINES = [
    "runs on real data, inside your stack",
    "human approval where it matters",
    "measured against your own baseline",
    "documented, evaluated, handed over",
]

NODE_W, NODE_H = 218, 96
NODE_Y = 636
NODE_X = [96, 348, 600, 852, 1104, 1356]


def draw_scene(draw, t, ink_a=1.0, accent_a=1.0, layer=None):
    def ink(a=1.0):
        return INK + (int(255 * min(1.0, a * ink_a)),)

    def blue(a=1.0):
        return BLUE + (int(255 * min(1.0, a * accent_a)),)

    def grey(a=1.0):
        return MUTED + (int(255 * min(1.0, a * ink_a)),)

    # title
    p = seg(t, 0.3, 1.4)
    text(draw, (100, 60), "THE FORWARD-DEPLOYED MODEL", F_TITLE, INK, p * ink_a)
    stroke(draw, [(100, 118), (612, 118)], seg(t, 0.9, 1.7), blue(0.9), 3.0, 2.1)
    text(
        draw,
        (100, 136),
        "Two engineers embed in your team and take one workflow to production.",
        F_SUB,
        MUTED,
        seg(t, 1.5, 2.2) * ink_a,
    )

    # client boundary
    stroke(
        draw,
        rect_pts(100, 208, 764, 524, 24),
        seg(t, 2.2, 3.5),
        ink(0.55),
        2.2,
        7.3,
        dash=(16 * SS, 11 * SS),
    )
    text(draw, (126, 226), "INSIDE YOUR ENVIRONMENT", F_MONO, MUTED, seg(t, 3.2, 3.9) * ink_a)

    # the two engineers
    for i, (cx, tag, role) in enumerate(
        ((268, "FDE 1", "PRODUCT · WORKFLOW"), (470, "FDE 2", "ENGINEERING · AI"))
    ):
        t0 = 3.8 + i * 1.15
        p = seg(t, t0, t0 + 1.0)
        cy = 302
        stroke(draw, circle_pts(cx, cy - 26, 25), p, ink(0.92), 2.6, 11.0 + i)
        stroke(draw, [(cx, cy + 2), (cx, cy + 46)], min(1.0, p * 1.6), ink(0.92), 2.6, 13.0 + i)
        stroke(draw, [(cx - 34, cy + 16), (cx + 34, cy + 16)], min(1.0, p * 1.9), ink(0.92), 2.6, 15.0 + i)
        stroke(draw, [(cx, cy + 46), (cx - 24, cy + 84)], min(1.0, p * 2.2), ink(0.92), 2.6, 17.0 + i)
        stroke(draw, [(cx, cy + 46), (cx + 24, cy + 84)], min(1.0, p * 2.2), ink(0.92), 2.6, 19.0 + i)
        a = fade(t, t0 + 0.55, t0 + 1.1)
        text(draw, (cx, cy + 108), tag, F_LABEL, INK, a * ink_a, anchor="ma")
        text(draw, (cx, cy + 134), role, F_MONO, MUTED, a * ink_a, anchor="ma")

    # the systems they connect
    for i, name in enumerate(SYSTEMS):
        t0 = 6.3 + i * 0.28
        p = seg(t, t0, t0 + 0.5)
        x = 132 + i * 154
        stroke(draw, rect_pts(x, 466, x + 130, 508, 12), p, ink(0.62), 2.0, 23.0 + i)
        text(draw, (x + 65, 478), name, F_MONO, MUTED, fade(t, t0 + 0.25, t0 + 0.6) * ink_a, anchor="ma")

    # handoff arrow
    arrow(draw, (770, 352), (852, 352), seg(t, 7.6, 8.3), blue(0.95), 2.6, 29.0)
    text(draw, (811, 316), "one workflow", F_MONO, BLUE, fade(t, 8.0, 8.5) * accent_a, anchor="ma")

    # the deployed result
    p = seg(t, 8.4, 9.7)
    stroke(draw, rect_pts(864, 208, 1504, 524, 24), p, ink(0.9), 2.8, 31.0)
    stroke(draw, [(864, 208), (864, 524)], min(1.0, p * 1.4), blue(0.95), 5.0, 33.0, wobble=0.8)

    a = fade(t, 9.2, 9.8)
    text(draw, (902, 244), "A DEPLOYED SYSTEM", F_BIG, INK, a * ink_a)
    ck = seg(t, 9.6, 10.2)
    stroke(draw, [(1408, 258), (1428, 280), (1466, 236)], ck, blue(1.0), 4.2, 35.0, wobble=0.8)

    for i, line in enumerate(RESULT_LINES):
        t0 = 9.9 + i * 0.36
        la = fade(t, t0, t0 + 0.45)
        y = 316 + i * 46
        stroke(draw, [(904, y + 9), (924, y + 9)], seg(t, t0, t0 + 0.3), blue(0.8), 2.4, 37.0 + i)
        text(draw, (940, y), line, F_SMALL, INK, la * 0.86 * ink_a)

    # the DEPLOY loop
    for i, (letter, word, caption) in enumerate(LOOP):
        t0 = 11.4 + i * 0.82
        p = seg(t, t0, t0 + 0.62)
        x = NODE_X[i]
        stroke(draw, rect_pts(x, NODE_Y, x + NODE_W, NODE_Y + NODE_H, 18), p, ink(0.88), 2.5, 41.0 + i)
        a = fade(t, t0 + 0.3, t0 + 0.7)

        # a pulse of colour travels the loop once everything is drawn
        pulse = 0.0
        if t > 19.2:
            phase = ((t - 19.2) / 1.5) % 1.0
            dist = abs(phase - i / (len(LOOP) - 1))
            pulse = max(0.0, 1 - dist * 5.5)

        text(draw, (x + 26, NODE_Y + 22), letter, F_LETTER, BLUE, min(1.0, (a * 0.75 + pulse) * accent_a))
        text(draw, (x + 84, NODE_Y + 24), word, F_LABEL, INK, a * ink_a)
        text(draw, (x + 84, NODE_Y + 52), caption, F_MONO, MUTED, a * ink_a)

        if i < len(LOOP) - 1:
            arrow(
                draw,
                (x + NODE_W + 4, NODE_Y + NODE_H / 2),
                (NODE_X[i + 1] - 4, NODE_Y + NODE_H / 2),
                seg(t, t0 + 0.5, t0 + 0.86),
                ink(0.6),
                2.2,
                51.0 + i,
                head=10,
            )

    # feed from the pod into the loop
    arrow(draw, (300, 566), (300, 624), seg(t, 11.2, 11.7), ink(0.5), 2.2, 61.0, head=10)

    # the human approval gate
    p = seg(t, 16.4, 17.2)
    stroke(draw, rect_pts(735, 546, 935, 596, 14), p, blue(0.85), 2.4, 63.0, dash=(13 * SS, 9 * SS))
    text(draw, (835, 560), "HUMAN APPROVAL", F_MONO, BLUE, fade(t, 16.8, 17.3) * accent_a, anchor="ma")
    stroke(draw, [(835, 600), (835, 632)], seg(t, 17.0, 17.4), blue(0.7), 2.2, 65.0)

    # the measured feedback arc
    p = seg(t, 17.4, 18.6)
    stroke(draw, arc_pts(806, 748, 700, 46, 0, 180), p, ink(0.5), 2.2, 67.0, dash=(15 * SS, 11 * SS))
    if p > 0.96:
        arrow(draw, (128, 772), (106, 744), 1.0, ink(0.5), 2.2, 69.0, head=10)
    text(
        draw,
        (806, 816),
        "measured on your baseline, then improved",
        F_MONO,
        MUTED,
        fade(t, 18.1, 18.7) * ink_a,
        anchor="ma",
    )

    # signature
    a = fade(t, 18.6, 19.3)
    text(draw, (100, 856), "DEPLOY", F_LABEL, INK, a * ink_a)
    text(draw, (196, 860), "· Build Fast with AI · deployed, not demoed", F_MONO, MUTED, a * ink_a)


def bezier(p0, p1, p2, steps=40):
    """Quadratic curve, so flow lines arc instead of kinking."""
    out = []
    for i in range(steps + 1):
        s = i / steps
        m = 1 - s
        out.append(
            (
                m * m * p0[0] + 2 * m * s * p1[0] + s * s * p2[0],
                m * m * p0[1] + 2 * m * s * p1[1] + s * s * p2[1],
            )
        )
    return out


def dot(draw, pts, f, color, r=6.0):
    """A travelling pulse at fraction `f` along a polyline."""
    if not (0.0 <= f <= 1.0) or len(pts) < 2:
        return
    pts = resample([(x * SS, y * SS) for x, y in pts], step=4.0 * SS)
    i = min(len(pts) - 1, int(f * (len(pts) - 1)))
    x, y = pts[i]
    rr = r * SS
    draw.ellipse([x - rr, y - rr, x + rr, y + rr], fill=color)


def seated(draw, x, desk_y, p, ink, seed):
    """A person at a laptop, sketched in as `p` goes 0 → 1."""
    stroke(draw, circle_pts(x, desk_y - 84, 17), min(1.0, p * 1.5), ink, 2.4, seed)
    stroke(
        draw,
        arc_pts(x, desk_y - 34, 32, 30, 180, 360),
        min(1.0, max(0.0, p - 0.18) * 1.7),
        ink,
        2.4,
        seed + 1,
    )
    screen = [
        (x - 22, desk_y - 4),
        (x - 12, desk_y - 40),
        (x + 28, desk_y - 40),
        (x + 20, desk_y - 4),
        (x - 22, desk_y - 4),
    ]
    stroke(draw, screen, min(1.0, max(0.0, p - 0.42) * 1.9), ink, 2.2, seed + 2, wobble=1.0)


def standing(draw, x, y, p, ink, seed):
    """A person pointing at the board."""
    stroke(draw, circle_pts(x, y - 100, 19), min(1.0, p * 1.6), ink, 2.6, seed)
    stroke(draw, [(x, y - 78), (x, y - 12)], min(1.0, max(0.0, p - 0.16) * 2.0), ink, 2.6, seed + 1)
    stroke(draw, [(x, y - 12), (x - 20, y + 36)], min(1.0, max(0.0, p - 0.34) * 2.2), ink, 2.6, seed + 2)
    stroke(draw, [(x, y - 12), (x + 20, y + 36)], min(1.0, max(0.0, p - 0.34) * 2.2), ink, 2.6, seed + 3)
    stroke(draw, [(x - 2, y - 62), (x + 54, y - 92)], min(1.0, max(0.0, p - 0.5) * 2.4), ink, 2.6, seed + 4)


HERO_LOOP = 18.0
DESK_Y = 812
SEATS = [188, 452, 726, 1010, 1300]
SIGNALS = [(46, 300), (46, 384), (46, 468), (46, 552)]


def draw_hero_scene(draw, t, ink_a=1.0, accent_a=1.0, layer=None):
    """A separate, quieter scene for the hero: a team, a board, work in flight."""

    def ink(a=1.0):
        return INK + (int(255 * min(1.0, a * ink_a)),)

    def blue(a=1.0):
        return BLUE + (int(255 * min(1.0, a * accent_a)),)

    # the desk the team works at
    stroke(draw, [(52, DESK_Y), (1548, DESK_Y)], seg(t, 0.5, 3.0), ink(0.72), 2.8, 3.0, wobble=1.2)

    # the team
    for i, x in enumerate(SEATS):
        t0 = 1.2 + i * 0.62
        seated(draw, x, DESK_Y, seg(t, t0, t0 + 1.1), ink(0.78), 11.0 + i * 5)

    # incoming signals stacking up on the far left
    rail = [(112, 286), (112, 596)]
    stroke(draw, rail, seg(t, 2.5, 3.6), ink(0.4), 2.2, 41.0, dash=(12 * SS, 9 * SS))
    for i, (x, y) in enumerate(SIGNALS):
        t0 = 2.7 + i * 0.34
        p = seg(t, t0, t0 + 0.6)
        stroke(draw, rect_pts(x, y, x + 132, y + 54, 12), p, ink(0.6), 2.3, 45.0 + i)
        stroke(draw, [(x + 18, y + 20), (x + 96, y + 20)], min(1.0, max(0.0, p - 0.4) * 2.0), ink(0.34), 2.0, 49.0 + i)
        stroke(draw, [(x + 18, y + 34), (x + 68, y + 34)], min(1.0, max(0.0, p - 0.55) * 2.2), ink(0.34), 2.0, 53.0 + i)
        stroke(draw, [(x + 132, y + 27), (172, y + 27)], min(1.0, max(0.0, p - 0.6) * 2.4), ink(0.34), 2.0, 57.0 + i)

    # a pulse running down the signal rail
    if t > 4.4:
        for k in range(2):
            f = (((t - 4.4) / 2.6) + k * 0.5) % 1.0
            dot(draw, rail, f, blue(0.9), 5.5)

    # the board, bleeding off the right edge
    p = seg(t, 4.0, 5.6)
    stroke(draw, rect_pts(1332, 150, 1660, 470, 22), p, ink(0.72), 2.8, 61.0)
    for i in range(3):
        t0 = 5.0 + i * 0.5
        q = seg(t, t0, t0 + 0.6)
        y = 196 + i * 84
        stroke(draw, rect_pts(1372, y, 1600, y + 54, 14), q, ink(0.6), 2.4, 65.0 + i)
        if i < 2:
            arrow(draw, (1486, y + 58), (1486, y + 78), seg(t, t0 + 0.45, t0 + 0.7), ink(0.45), 2.2, 69.0 + i, head=8)

    # the node the pulse is currently on
    if t > 8.2:
        active = int(((t - 8.2) / 1.3) % 3)
        y = 196 + active * 84
        stroke(draw, rect_pts(1372, y, 1600, y + 54, 14), 1.0, blue(0.85), 2.8, 65.0 + active)

    # the shipped tick
    stroke(draw, [(1392, 426), (1410, 446), (1448, 402)], seg(t, 7.0, 7.8), blue(0.95), 4.0, 73.0, wobble=0.8)

    # someone walking the team through it
    standing(draw, 1246, 470, seg(t, 6.0, 7.4), ink(0.8), 81.0)

    # a few of the systems the board pulls from
    for i, (x, y) in enumerate(((1140, 208), (1064, 300), (1150, 392))):
        t0 = 6.6 + i * 0.3
        q = seg(t, t0, t0 + 0.5)
        stroke(draw, rect_pts(x, y, x + 62, y + 56, 16), q, ink(0.5), 2.2, 101.0 + i)
        stroke(draw, [(x + 18, y + 22), (x + 44, y + 22)], min(1.0, max(0.0, q - 0.5) * 2.2), ink(0.3), 2.0, 105.0 + i)
        stroke(draw, [(x + 18, y + 36), (x + 36, y + 36)], min(1.0, max(0.0, q - 0.65) * 2.4), ink(0.3), 2.0, 109.0 + i)
        link = bezier((x + 66, y + 28), (x + 160, y + 28), (1332, 250 + i * 84), 22)
        stroke(draw, link, seg(t, t0 + 0.4, t0 + 0.9), ink(0.3), 2.0, 113.0 + i, dash=(11 * SS, 8 * SS))
        if t > 9.0:
            dot(draw, link, (((t - 9.0) / 1.8) + i * 0.33) % 1.0, blue(0.6), 4.2)

    # work rising from the desks toward the board
    arcs = [
        bezier((452, DESK_Y - 100), (820, 600), (1210, 520)),
        bezier((1010, DESK_Y - 100), (1180, 700), (1246, 578)),
    ]
    for i, curve in enumerate(arcs):
        stroke(draw, curve, seg(t, 7.0 + i * 0.4, 8.4 + i * 0.4), ink(0.36), 2.2, 91.0 + i, dash=(13 * SS, 10 * SS))
        if t > 8.6:
            f = (((t - 8.6) / 2.2) + i * 0.4) % 1.0
            dot(draw, curve, f, blue(0.8), 5.0)


def background(size, alpha=1.0):
    img = Image.new("RGB", size, PAPER)
    d = ImageDraw.Draw(img, "RGBA")
    step = 40 * SS
    col = GRID + (int(120 * alpha),)
    for x in range(0, size[0], step):
        d.line([(x, 0), (x, size[1])], fill=col, width=1)
    for y in range(0, size[1], step):
        d.line([(0, y), (size[0], y)], fill=col, width=1)
    return img


def render(out_path, width, height, duration, ink_a, accent_a, grid_a, drift, scene=None):
    scene = scene or draw_scene
    frames = int(duration * FPS)
    tmp = tempfile.mkdtemp(prefix="deploy-sketch-")
    base = background((W * SS, H * SS), grid_a)

    try:
        for f in range(frames):
            t = f / FPS
            img = base.copy()
            layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
            draw = ImageDraw.Draw(layer)

            # gentle fade at the seam so the loop does not snap
            seam = min(1.0, min(t / 0.6, (duration - t) / 0.9))
            scene(draw, t, ink_a * seam, accent_a * seam, layer)

            img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")

            if drift:
                z = 1.0 + drift * (0.5 + 0.5 * math.cos(2 * math.pi * t / duration))
                cw, ch = int(img.width / z), int(img.height / z)
                ox, oy = (img.width - cw) // 2, (img.height - ch) // 2
                img = img.crop((ox, oy, ox + cw, oy + ch))

            img = img.resize((width, height), Image.LANCZOS)
            img.save(os.path.join(tmp, f"f{f:05d}.png"), compress_level=1)

            if f % 40 == 0:
                print(f"  {os.path.basename(out_path)}  frame {f}/{frames}", flush=True)

        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        subprocess.run(
            [
                "ffmpeg", "-y", "-loglevel", "error",
                "-framerate", str(FPS),
                "-i", os.path.join(tmp, "f%05d.png"),
                "-c:v", "libx264",
                "-profile:v", "high",
                "-pix_fmt", "yuv420p",
                "-crf", "24",
                "-preset", "slow",
                "-movflags", "+faststart",
                "-an",
                out_path,
            ],
            check=True,
        )
        print(f"  wrote {out_path} ({os.path.getsize(out_path) / 1_000_000:.2f} MB)")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def main():
    load_fonts()
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    media = os.path.join(root, "public", "media")

    render(os.path.join(media, "fde-sketch.mp4"), 1600, 900, DURATION, 1.0, 1.0, 1.0, 0.0)
    render(
        os.path.join(media, "hero-loop.mp4"),
        1600, 900, HERO_LOOP,
        0.62, 0.82, 0.65, 0.035,
        scene=draw_hero_scene,
    )


if __name__ == "__main__":
    main()
