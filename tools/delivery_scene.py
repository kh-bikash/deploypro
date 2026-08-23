"""The 'inside a live workflow' scene — the delivery mechanism, with real product logos."""

import os

from PIL import Image

_LOGO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logos")
_cache = {}


def logo(name, px):
    key = (name, px)
    if key not in _cache:
        path = os.path.join(_LOGO_DIR, f"{name}.png")
        if not os.path.exists(path):
            _cache[key] = None
        else:
            _cache[key] = Image.open(path).convert("RGBA").resize((px, px), Image.LANCZOS)
    return _cache[key]


def paste_logo(layer, name, cx, cy, px, alpha, SS):
    """Drop a real favicon into the sketch, faded to `alpha`."""
    if layer is None or alpha <= 0.02:
        return
    img = logo(name, int(px * SS))
    if img is None:
        return
    if alpha < 0.99:
        faded = img.copy()
        a = faded.getchannel("A").point(lambda v: int(v * alpha))
        faded.putalpha(a)
        img = faded
    layer.alpha_composite(img, (int(cx * SS - img.width / 2), int(cy * SS - img.height / 2)))


SOURCES = [
    ("salesforce", "Salesforce", 300),
    ("notion", "Notion", 452),
    ("zendesk", "Zendesk", 604),
]
TARGETS = [
    ("hubspot", "HubSpot", 996),
    ("slack", "Slack", 1148),
    ("airtable", "Airtable", 1300),
]

STAGES = [
    ("01", "Detect", "the trigger"),
    ("02", "Enrich", "the context"),
    ("03", "Plan", "the next action"),
    ("04", "Act", "approved tools only"),
    ("05", "Yield", "the measured result"),
]

STAGE_X = [85, 380, 675, 970, 1265]
STAGE_W, STAGE_H = 250, 112
STAGE_Y = 430
TILE_Y = 206
TILE_W, TILE_H = 96, 78


def build(mod):
    """Returns the scene function, bound to the generator module's helpers."""
    stroke = mod.stroke
    arrow = mod.arrow
    text = mod.text
    rect_pts = mod.rect_pts
    circle_pts = mod.circle_pts
    bezier = mod.bezier
    dot = mod.dot
    seg = mod.seg
    fade = mod.fade
    SS = mod.SS
    INK, MUTED, BLUE = mod.INK, mod.MUTED, mod.BLUE

    def scene(draw, t, ink_a=1.0, accent_a=1.0, layer=None):
        def ink(a=1.0):
            return INK + (int(255 * min(1.0, a * ink_a)),)

        def blue(a=1.0):
            return BLUE + (int(255 * min(1.0, a * accent_a)),)

        # ---- heading
        text(draw, (100, 58), "INSIDE A LIVE WORKFLOW", mod.F_TITLE, INK, seg(t, 0.3, 1.3) * ink_a)
        stroke(draw, [(100, 116), (556, 116)], seg(t, 0.8, 1.6), blue(0.9), 3.0, 2.1)
        text(
            draw,
            (100, 134),
            "One trigger, the systems it touches, and the point where a person stays in control.",
            mod.F_SUB,
            MUTED,
            seg(t, 1.4, 2.1) * ink_a,
        )

        # ---- the systems it reads from and writes to
        for i, (key, label, x) in enumerate(SOURCES + TARGETS):
            t0 = 2.2 + i * 0.3
            p = seg(t, t0, t0 + 0.55)
            stroke(draw, rect_pts(x, TILE_Y, x + TILE_W, TILE_Y + TILE_H, 18), p, ink(0.62), 2.3, 21.0 + i)
            a = fade(t, t0 + 0.3, t0 + 0.7)
            paste_logo(layer, key, x + TILE_W / 2, TILE_Y + 34, 38, a * ink_a, SS)
            text(draw, (x + TILE_W / 2, TILE_Y + 88), label, mod.F_MONO, MUTED, a * ink_a, anchor="ma")

        text(draw, (452, 176), "READS", mod.F_MONO, BLUE, fade(t, 3.4, 4.0) * accent_a, anchor="ma")
        text(draw, (1148, 176), "WRITES", mod.F_MONO, BLUE, fade(t, 4.4, 5.0) * accent_a, anchor="ma")

        # ---- the pipeline
        for i, (num, word, caption) in enumerate(STAGES):
            t0 = 5.0 + i * 0.78
            p = seg(t, t0, t0 + 0.6)
            x = STAGE_X[i]
            stroke(draw, rect_pts(x, STAGE_Y, x + STAGE_W, STAGE_Y + STAGE_H, 20), p, ink(0.88), 2.6, 41.0 + i)
            a = fade(t, t0 + 0.3, t0 + 0.7)

            pulse = 0.0
            if t > 14.6:
                phase = ((t - 14.6) / 2.0) % 1.0
                pulse = max(0.0, 1 - abs(phase - i / (len(STAGES) - 1)) * 5.5)

            text(draw, (x + 24, STAGE_Y + 24), num, mod.F_MONO, BLUE, min(1.0, (a * 0.8 + pulse) * accent_a))
            text(draw, (x + 24, STAGE_Y + 46), word, mod.F_BIG, INK, a * ink_a)
            text(draw, (x + 24, STAGE_Y + 84), caption, mod.F_MONO, MUTED, a * ink_a)

            if i < len(STAGES) - 1:
                arrow(
                    draw,
                    (x + STAGE_W + 8, STAGE_Y + STAGE_H / 2),
                    (STAGE_X[i + 1] - 8, STAGE_Y + STAGE_H / 2),
                    seg(t, t0 + 0.5, t0 + 0.82),
                    ink(0.55), 2.2, 51.0 + i, head=10,
                )

        # ---- systems feeding the workflow
        feeds = [
            (SOURCES, 505, 9.4),
            (TARGETS, 1095, 10.0),
        ]
        for group, converge, t0 in feeds:
            for j, (_key, _label, x) in enumerate(group):
                curve = bezier((x + TILE_W / 2, TILE_Y + TILE_H + 6), (x + TILE_W / 2, 360), (converge, STAGE_Y - 8), 20)
                stroke(draw, curve, seg(t, t0 + j * 0.16, t0 + 0.7 + j * 0.16), ink(0.34), 2.0, 61.0 + j, dash=(11 * SS, 8 * SS))
                if t > 12.0:
                    dot(draw, curve, (((t - 12.0) / 2.0) + j * 0.3) % 1.0, blue(0.7), 4.4)

        # ---- a concrete trigger, so the pipeline is not abstract
        p = seg(t, 10.6, 11.5)
        stroke(draw, rect_pts(85, 600, 470, 668, 16), p, ink(0.45), 2.2, 91.0, dash=(12 * SS, 9 * SS))
        stroke(draw, [(150, 598), (150, 548)], seg(t, 11.2, 11.6), ink(0.4), 2.0, 92.0)
        a = fade(t, 11.1, 11.7)
        text(draw, (110, 614), "FOR EXAMPLE", mod.F_MONO, BLUE, a * accent_a)
        text(draw, (110, 638), "an invoice lands in the shared inbox", mod.F_MONO, MUTED, a * ink_a)

        # ---- the human approval boundary
        p = seg(t, 11.0, 12.0)
        stroke(draw, rect_pts(792, 604, 1104, 674, 16), p, blue(0.85), 2.5, 71.0, dash=(13 * SS, 9 * SS))
        a = fade(t, 11.5, 12.1)
        stroke(draw, circle_pts(834, 626, 11), min(1.0, p * 1.4), blue(0.8), 2.2, 73.0)
        stroke(draw, mod.arc_pts(834, 654, 20, 18, 180, 360), min(1.0, p * 1.4), blue(0.8), 2.2, 74.0)
        text(draw, (868, 616), "HUMAN APPROVAL", mod.F_MONO, BLUE, a * accent_a)
        text(draw, (868, 640), "sensitive actions wait for a person", mod.F_MONO, MUTED, a * ink_a)
        stroke(draw, [(932, 602), (932, 502)], seg(t, 11.8, 12.3), blue(0.65), 2.2, 75.0)

        # ---- the measured outcome
        p = seg(t, 12.2, 13.4)
        stroke(draw, [(1196, 812), (1500, 812)], p, ink(0.6), 2.4, 81.0)
        stroke(draw, [(1196, 812), (1196, 704)], p, ink(0.6), 2.4, 82.0)
        for i, h in enumerate((34, 56, 78, 100)):
            q = seg(t, 12.8 + i * 0.22, 13.2 + i * 0.22)
            bx = 1224 + i * 66
            stroke(
                draw,
                rect_pts(bx, 812 - h * q, bx + 42, 812, 6),
                1.0 if q > 0.02 else 0.0,
                blue(0.28 + i * 0.2),
                2.2,
                85.0 + i,
            )
        text(
            draw,
            (1196, 668),
            "measured on your baseline",
            mod.F_MONO,
            MUTED,
            fade(t, 13.4, 14.0) * ink_a,
        )

        # ---- signature
        a = fade(t, 13.8, 14.5)
        text(draw, (100, 856), "DEPLOY", mod.F_LABEL, INK, a * ink_a)
        text(draw, (196, 860), "· from Build Fast with AI", mod.F_MONO, MUTED, a * ink_a)

    return scene
