"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

/* The ambient desk layer (design.md §7): ordered Bayer dither over a very
   slow warm gradient drift, raw WebGL, ~30fps cap, paused when the tab is
   hidden. Reduced motion: one static frame. No WebGL: static 2D grain. */

const VERTEX = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_colorA;
uniform vec3 u_colorB;

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  /* ~8s drift period, slight spatial tilt so the field breathes. */
  float t = 0.5 + 0.5 * sin(u_time * 0.785 + uv.x * 1.7 + uv.y * 1.1);
  float threshold = bayer4(gl_FragCoord.xy);
  float q = step(threshold, t);
  gl_FragColor = vec4(mix(u_colorA, u_colorB, q), 1.0);
}
`;

function cssColorToRgb(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const hex = raw.replace("#", "");
  if (hex.length !== 6) return [0.84, 0.82, 0.78];
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
}

function drawStaticGrain(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = canvas;
  const image = ctx.createImageData(width, height);
  const a = cssColorToRgb("--console-bg");
  const b = cssColorToRgb("--console-bg-drift");
  for (let i = 0; i < image.data.length; i += 4) {
    const pick = Math.random() < 0.5 ? a : b;
    image.data[i] = pick[0] * 255;
    image.data[i + 1] = pick[1] * 255;
    image.data[i + 2] = pick[2] * 255;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
}

export default function DitherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // DPR capped at 1 — it's grain; nobody can tell.
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const gl =
      canvas.getContext("webgl", { antialias: false, depth: false }) ||
      (canvas.getContext("experimental-webgl", {
        antialias: false,
        depth: false,
      }) as WebGLRenderingContext | null);

    if (!gl) {
      drawStaticGrain(canvas);
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      drawStaticGrain(canvas);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uColorA = gl.getUniformLocation(program, "u_colorA");
    const uColorB = gl.getUniformLocation(program, "u_colorB");

    gl.uniform3fv(uColorA, cssColorToRgb("--console-bg"));
    gl.uniform3fv(uColorB, cssColorToRgb("--console-bg-drift"));

    const render = (timeMs: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, timeMs / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduced) {
      // Final state: one static frame, no drift.
      render(0);
      return;
    }

    let raf = 0;
    let last = 0;
    let running = true;

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      // ~30fps cap.
      if (now - last < 33) return;
      last = now;
      render(now);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    const onResize = () => {
      resize();
      render(performance.now());
    };

    raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.45,
      }}
    />
  );
}
