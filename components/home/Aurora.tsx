"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import styles from "./Aurora.module.css";

/**
 * 2nd Blue Design: Multi-octave domain-warped WebGL2 Aurora shader.
 * Produces silky, fluid, atmospheric ribbon dynamics tuned to minimalist blue tones.
 */

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Multi-octave domain-warping for liquid organic flow
float fbm(vec2 p) {
  float n1 = snoise(p);
  vec2 warp = vec2(n1, snoise(p + vec2(5.2, 1.3)));
  float n2 = snoise(p * 2.05 + warp * 0.7);
  float n3 = snoise(p * 4.1 + warp * 1.2);
  return n1 * 0.55 + n2 * 0.32 + n3 * 0.13;
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, clamp(lerpFactor, 0.0, 1.0)); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  // Flow coordinates with organic time evolution
  vec2 flowCoord1 = vec2(uv.x * 1.35 + uTime * 0.035, uv.y * 0.85 + uTime * 0.022);
  vec2 flowCoord2 = vec2(uv.x * 2.2 - uTime * 0.045, uv.y * 1.4 - uTime * 0.03);

  float flow1 = fbm(flowCoord1) * uAmplitude;
  float flow2 = fbm(flowCoord2) * uAmplitude;

  // Compute organic ribbon heights
  float wave1 = sin(uv.x * 3.1415 + flow1 * 1.4) * 0.25 + flow1 * 0.35;
  float wave2 = cos(uv.x * 2.4 - flow2 * 1.2) * 0.2 + flow2 * 0.25;

  float targetY1 = 0.48 + wave1;
  float targetY2 = 0.36 + wave2;

  // Soft atmospheric vertical falloff
  float dist1 = abs(uv.y - targetY1);
  float dist2 = abs(uv.y - targetY2);

  float glow1 = exp(-dist1 * 3.8);
  float glow2 = exp(-dist2 * 4.6);

  float totalGlow = glow1 * 0.75 + glow2 * 0.55;

  // Color mapping with dynamic fluid interpolation
  float colorFactor = clamp(uv.x * 0.8 + flow1 * 0.4 + 0.1, 0.0, 1.0);
  vec3 rampColor;
  COLOR_RAMP(colors, colorFactor, rampColor);

  // Soft vignette and blend
  float verticalFade = smoothstep(0.0, 0.22, uv.y) * smoothstep(0.98, 0.55, uv.y);
  float alpha = clamp(totalGlow * verticalFade * (1.1 - uBlend * 0.3), 0.0, 1.0);

  vec3 finalColor = rampColor * totalGlow * 1.4;

  fragColor = vec4(finalColor * alpha, alpha);
}
`;

type Props = {
  colorStops?: [string, string, string];
  amplitude?: number;
  blend?: number;
  speed?: number;
  /** render scale — below 1 is cheaper and softer */
  resolutionScale?: number;
};

export default function Aurora({
  colorStops = ["#0284c7", "#3b82f6", "#60a5fa"],
  amplitude = 1.0,
  blend = 0.55,
  speed = 0.32,
  resolutionScale = 0.85,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ colorStops, amplitude, blend, speed });
  propsRef.current = { colorStops, amplitude, blend, speed };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2) * resolutionScale,
      });
    } catch {
      return;
    }

    const gl = renderer.gl;

    if (!(gl instanceof WebGL2RenderingContext)) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return;
    }

    const canvas = gl.canvas as HTMLCanvasElement;
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) return;

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    canvas.style.backgroundColor = "transparent";

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const toRgb = (stops: string[]) =>
      stops.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: toRgb(colorStops) },
        uResolution: { value: [host.offsetWidth, host.offsetHeight] },
        uBlend: { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    host.appendChild(canvas);

    const resize = () => {
      const w = host.offsetWidth || 1;
      const h = host.offsetHeight || 1;
      renderer.setSize(w, h);
      canvas.style.width = "";
      canvas.style.height = "";
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const draw = (t: number) => {
      const p = propsRef.current;
      program.uniforms.uTime.value = t * 0.01 * (p.speed ?? 1) * 0.15;
      program.uniforms.uAmplitude.value = p.amplitude ?? 1;
      program.uniforms.uBlend.value = p.blend ?? 0.5;
      program.uniforms.uColorStops.value = toRgb(p.colorStops ?? colorStops);
      renderer.render({ scene: mesh });
    };

    if (reduced) {
      draw(900);
      return () => {
        resizeObserver.disconnect();
        if (canvas.parentNode === host) host.removeChild(canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    let frame = 0;
    let running = false;
    const loop = (t: number) => {
      draw(t);
      frame = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? play() : pause()),
      { threshold: 0 },
    );
    observer.observe(host);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (host.getBoundingClientRect().bottom > 0) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (canvas.parentNode === host) host.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude, resolutionScale]);

  return <div className={styles.aurora} ref={hostRef} aria-hidden="true" />;
}
