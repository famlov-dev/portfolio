"use client";

import { useEffect, useRef, useState } from "react";

type AmbientPetal = {
  depth: number;
  x: number;
  y: number;
  driftSpeed: number;
  fallSpeed: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  rotation: number;
  spinSpeed: number;
  size: number;
  opacity: number;
};

const PETAL_COUNT = 42;
const PETAL_MARGIN = 64;

function createPetal(width: number, height: number, randomizeY = false): AmbientPetal {
  // Depth: 0 = far (subtle), 1 = near (clearer and faster)
  const depth = Math.random();
  const nearFactor = 0.78 + depth * 0.95;
  const farOpacityPenalty = (1 - depth) * 0.1;

  return {
    depth,
    x: Math.random() * width,
    y: randomizeY ? Math.random() * (height + PETAL_MARGIN * 2) - PETAL_MARGIN : -Math.random() * height * 0.8,
    driftSpeed: (-8 + Math.random() * 16) * (0.75 + depth * 0.6),
    fallSpeed: (46 + Math.random() * 54) * nearFactor,
    swayAmp: (10 + Math.random() * 18) * (0.7 + depth * 0.8),
    swayFreq: 0.35 + Math.random() * 0.55,
    swayPhase: Math.random() * Math.PI * 2,
    rotation: Math.random() * 360,
    spinSpeed: (-12 + Math.random() * 24) * (0.85 + depth * 0.45),
    size: (9 + Math.random() * 10) * nearFactor,
    opacity: Math.min(0.74, Math.max(0.3, 0.34 + depth * 0.28 + Math.random() * 0.1 - farOpacityPenalty)),
  };
}

function applyPetalVisuals(element: HTMLSpanElement, petal: AmbientPetal, isDark: boolean) {
  const outlineBase = isDark ? "255, 221, 236" : "255, 236, 246";
  element.style.width = `${petal.size}px`;
  element.style.height = `${petal.size * 0.72}px`;
  element.style.opacity = petal.opacity.toFixed(3);
  element.style.filter = `blur(${Math.max(0, 0.018 - petal.depth * 0.015).toFixed(3)}px)`;
  element.style.boxShadow = `0 1px ${Math.round(1 + petal.depth * 2)}px rgba(176, 82, 117, ${(0.12 + petal.depth * 0.14).toFixed(3)})`;
  element.style.outline = `${(0.2 + petal.depth * 0.45).toFixed(2)}px solid rgba(${outlineBase}, ${(0.12 + petal.depth * 0.2).toFixed(3)})`;
  element.style.outlineOffset = "-0.5px";
}

export default function JapaneseAmbientBackground() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<AmbientPetal[]>([]);
  const petalElementsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const viewportRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setIsReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!isMounted || isReducedMotion) return;

    const root = rootRef.current;
    if (!root) return;

    let ticking = false;

    const updateParallax = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = window.scrollY / maxScroll;

      // Keep movement subtle so text legibility remains stable.
      const petalY = progress * 26;
      const petalX = progress * 10;
      const mistY = progress * 42;
      const mistX = progress * 16;

      root.style.setProperty("--ambient-petal-y", `${petalY.toFixed(2)}px`);
      root.style.setProperty("--ambient-petal-x", `${petalX.toFixed(2)}px`);
      root.style.setProperty("--ambient-mist-y", `${mistY.toFixed(2)}px`);
      root.style.setProperty("--ambient-mist-x", `${mistX.toFixed(2)}px`);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMounted, isReducedMotion]);

  useEffect(() => {
    if (!isMounted || isReducedMotion) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    viewportRef.current = { width, height };
    petalsRef.current = Array.from({ length: PETAL_COUNT }, () => createPetal(width, height, true));
    let isDark = document.documentElement.classList.contains("dark");

    const refreshPetalThemeVisuals = () => {
      isDark = document.documentElement.classList.contains("dark");
      for (let index = 0; index < PETAL_COUNT; index += 1) {
        const element = petalElementsRef.current[index];
        const petal = petalsRef.current[index];
        if (!element || !petal) continue;
        applyPetalVisuals(element, petal, isDark);
      }
    };

    for (let index = 0; index < PETAL_COUNT; index += 1) {
      const element = petalElementsRef.current[index];
      const petal = petalsRef.current[index];
      if (!element || !petal) continue;
      applyPetalVisuals(element, petal, isDark);
      element.style.transform = `translate3d(${petal.x}px, ${petal.y}px, 0) rotate(${petal.rotation.toFixed(2)}deg)`;
    }

    let rafId = 0;
    let lastTimestamp = performance.now();

    const updateViewport = () => {
      viewportRef.current = { width: window.innerWidth, height: window.innerHeight };
    };

    const frame = (timestamp: number) => {
      const deltaSeconds = Math.min(0.033, (timestamp - lastTimestamp) / 1000);
      lastTimestamp = timestamp;
      const timeSeconds = timestamp * 0.001;

      // Slow, natural wind + tiny gusts to avoid repetitive motion.
      const windBase = Math.sin(timeSeconds * 0.19) * 7.6;
      const windSecondary = Math.sin(timeSeconds * 0.096 + 1.8) * 4.8;
      const windGust = Math.sin(timeSeconds * 0.5 + 0.7) * 1.9;
      const windX = windBase + windSecondary + windGust;

      const { width: currentWidth, height: currentHeight } = viewportRef.current;
      const petals = petalsRef.current;

      for (let index = 0; index < petals.length; index += 1) {
        const petal = petals[index];
        const element = petalElementsRef.current[index];
        if (!element) continue;

        petal.y += petal.fallSpeed * deltaSeconds;
        const depthWind = 0.35 + petal.depth * 0.95;
        petal.x += (petal.driftSpeed + windX * depthWind) * deltaSeconds;
        petal.rotation += petal.spinSpeed * deltaSeconds;

        const swayOffset = Math.sin(timestamp * 0.001 * petal.swayFreq + petal.swayPhase) * petal.swayAmp;
        const renderX = petal.x + swayOffset;

        if (petal.y > currentHeight + PETAL_MARGIN || renderX < -PETAL_MARGIN || renderX > currentWidth + PETAL_MARGIN) {
          const recycled = createPetal(currentWidth, currentHeight, false);
          petals[index] = recycled;
          applyPetalVisuals(element, recycled, isDark);
          element.style.transform = `translate3d(${recycled.x}px, ${recycled.y}px, 0) rotate(${recycled.rotation.toFixed(2)}deg)`;
        } else {
          element.style.transform = `translate3d(${renderX}px, ${petal.y}px, 0) rotate(${petal.rotation.toFixed(2)}deg)`;
        }
      }

      rafId = window.requestAnimationFrame(frame);
    };

    const themeObserver = new MutationObserver(() => {
      refreshPetalThemeVisuals();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", updateViewport);
    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateViewport);
      themeObserver.disconnect();
    };
  }, [isMounted, isReducedMotion]);

  if (!isMounted || isReducedMotion) return null;

  return (
    <div ref={rootRef} aria-hidden className="ambient-root pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="ambient-mist ambient-mist-left ambient-parallax-mist-left" />
      <div className="ambient-mist ambient-mist-right ambient-parallax-mist-right" />

      <div className="ambient-parallax-petals">
        {Array.from({ length: PETAL_COUNT }).map((_, index) => (
          <span
            key={`ambient-petal-${index}`}
            className="ambient-sakura-petal"
            ref={(element) => {
              petalElementsRef.current[index] = element;
            }}
            style={
              {
                width: "12px",
                height: "8.64px",
                opacity: 0.5,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
