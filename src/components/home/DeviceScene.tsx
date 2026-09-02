"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import { subscribeLamp } from "@/components/console/lamp";
import { pointer } from "@/components/motion/pointer";
import { ticker } from "@/components/motion/ticker";

/* The reference unit (design.md §5.13): a handheld console built from
   primitives — sand body, dark bezel, a glass plane with mint emissive
   readouts, three keycaps, one knob — lit by the same top-left lamp as
   the CSS shadows (the key light tracks --light-dx/--light-dy). It floats,
   follows the pointer, and turns slightly with scroll; under reduced
   motion it holds a three-quarter pose. Colours come from the console
   tokens and re-read when the lamp switch flips. Vanilla three.js: no
   React reconciler, and it renders on the shared ticker. */

interface DeviceSceneProps {
  /** Render continuously only while the dock is in view. */
  active: boolean;
  reduced: boolean;
  onFirstFrame?: () => void;
}

const REST_RX = 0.1;
const REST_RY = -0.3;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function readVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function readLight(): [number, number] {
  const s = document.documentElement.style;
  return [
    parseFloat(s.getPropertyValue("--light-dx")) || -1,
    parseFloat(s.getPropertyValue("--light-dy")) || -1,
  ];
}

export default function DeviceScene({ active, reduced, onFirstFrame }: DeviceSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const runRef = useRef<((run: boolean) => void) | null>(null);
  const firstFrame = useRef(onFirstFrame);
  firstFrame.current = onFirstFrame;

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 0, 6.2);

    /* ── Lights (the lamp) ── */
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(-3, 4, 5);
    const fill = new THREE.DirectionalLight(0xfff2dc, 0.35);
    fill.position.set(3, -2, 2);
    const hemi = new THREE.HemisphereLight(0xf4f1e8, 0x8a877c, 0.5);
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(keyLight, fill, hemi, ambient);

    /* ── Materials ── */
    const body = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0 });
    const bezel = new THREE.MeshStandardMaterial({ roughness: 0.6 });
    const glass = new THREE.MeshStandardMaterial({ roughness: 0.25 });
    const readout = new THREE.MeshStandardMaterial({ emissiveIntensity: 1.4 });
    const dim = new THREE.MeshStandardMaterial({ emissiveIntensity: 0.5 });
    const cap = new THREE.MeshStandardMaterial({ roughness: 0.8 });
    const knobMat = new THREE.MeshStandardMaterial({ roughness: 0.7 });
    const bloom = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const materials = [body, bezel, glass, readout, dim, cap, knobMat, bloom];

    /* ── Geometry ── */
    const bodyGeo = new RoundedBoxGeometry(2.2, 3.2, 0.5, 6, 0.18);
    const bezelGeo = new RoundedBoxGeometry(1.7, 1.5, 0.08, 3, 0.05);
    const capGeo = new RoundedBoxGeometry(0.42, 0.3, 0.14, 3, 0.05);
    const glassGeo = new THREE.PlaneGeometry(1.5, 1.3);
    const bloomGeo = new THREE.PlaneGeometry(1.9, 1.7);
    const readoutGeo = new THREE.PlaneGeometry(0.9, 0.08);
    const dimGeo = new THREE.PlaneGeometry(0.5, 0.05);
    const knobGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 32);
    const geometries = [bodyGeo, bezelGeo, capGeo, glassGeo, bloomGeo, readoutGeo, dimGeo, knobGeo];

    /* ── The unit ── */
    const unit = new THREE.Group();
    unit.rotation.set(REST_RX, REST_RY, 0);
    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      unit.add(m);
      return m;
    };
    add(bodyGeo, body, 0, 0, 0);
    add(bezelGeo, bezel, 0, 0.55, 0.27);
    add(bloomGeo, bloom, 0, 0.55, 0.305);
    add(glassGeo, glass, 0, 0.55, 0.32);
    add(readoutGeo, readout, -0.2, 0.78, 0.33);
    add(dimGeo, dim, -0.4, 0.6, 0.33);
    [-0.55, 0, 0.55].forEach((x) => add(capGeo, cap, x, -0.55, 0.27));
    const knob = add(knobGeo, knobMat, 0.7, -1.15, 0.28);
    knob.rotation.x = Math.PI / 2;
    scene.add(unit);

    /* ── Palette from the console tokens (re-read on lamp flip) ── */
    const applyPalette = () => {
      const night = document.documentElement.dataset.console === "night";
      const panel = readVar("--console-panel", "#e4e1d6");
      const panelHigh = readVar("--console-panel-high", "#edeae0");
      const mint = readVar("--console-lcd-text", "#76d2b6");
      body.color.set(panel);
      cap.color.set(panelHigh);
      knobMat.color.set(panelHigh);
      bezel.color.set(readVar("--console-lcd-bezel", "#1c1d1a"));
      glass.color.set(readVar("--console-lcd-bg", "#0e0f0d"));
      glass.emissive.set(mint);
      glass.emissiveIntensity = night ? 0.5 : 0.28;
      readout.color.set(mint);
      readout.emissive.set(mint);
      dim.color.set(mint);
      dim.emissive.set(mint);
      bloom.color.set(mint);
      bloom.opacity = night ? 0.18 : 0.1;
      keyLight.intensity = night ? 1.2 : 2.2;
      fill.intensity = night ? 0.25 : 0.35;
      fill.color.set(night ? "#c9d3d8" : "#fff2dc");
      hemi.color.set(night ? "#3a3b37" : "#f4f1e8");
      hemi.groundColor.set(night ? "#0e0f0d" : "#8a877c");
      ambient.intensity = night ? 0.2 : 0.3;
    };
    applyPalette();

    /* ── Size ── */
    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (!unsub) render();
    });
    ro.observe(el);

    /* ── Frames ── */
    let painted = false;
    const render = () => {
      renderer.render(scene, camera);
      if (!painted) {
        painted = true;
        firstFrame.current?.();
      }
    };

    let t = 0;
    const tick = (_time: number, dtMs: number) => {
      const dt = Math.min(dtMs / 1000, 0.05);
      t += dt;
      const p = pointer.get();
      const scroll = clamp(window.scrollY * 0.0015, 0, 0.6);
      const targetRx = REST_RX + (p.active ? -p.ny * 0.22 : 0);
      const targetRy = REST_RY + (p.active ? p.nx * 0.32 : 0) + scroll;
      const k = Math.min(1, dt * 4);
      unit.rotation.x += (targetRx - unit.rotation.x) * k;
      unit.rotation.y += (targetRy - unit.rotation.y) * k;
      unit.rotation.z = Math.sin(t * 0.5) * 0.02;
      unit.position.y = Math.sin(t * 0.8) * 0.06;

      const [dx, dy] = readLight();
      keyLight.position.x += (3 * dx - keyLight.position.x) * k;
      keyLight.position.y += (-4 * dy - keyLight.position.y) * k;

      render();
    };

    let unsub: (() => void) | null = null;
    const setRunning = (run: boolean) => {
      if (reduced) return;
      if (run && !unsub) unsub = ticker.add(tick);
      if (!run && unsub) {
        unsub();
        unsub = null;
      }
    };
    runRef.current = setRunning;

    // Reduced motion: one frame in the rest pose. Otherwise the in-view
    // effect below starts the loop; paint one frame now regardless so the
    // outline can yield immediately.
    render();

    const unsubLamp = subscribeLamp(() => {
      applyPalette();
      if (!unsub) render();
    });

    return () => {
      runRef.current = null;
      unsub?.();
      unsubLamp();
      ro.disconnect();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [reduced]);

  useEffect(() => {
    runRef.current?.(active);
  }, [active, reduced]);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />;
}
