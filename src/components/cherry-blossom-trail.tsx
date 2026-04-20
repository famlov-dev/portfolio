"use client";

import { useEffect, useRef } from "react";

const SPAWN_INTERVAL_MS = 55;
const MAX_PETALS = 90;

export default function CherryBlossomTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalCountRef = useRef(0);
  const lastSpawnAtRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const spawnPetal = (x: number, y: number) => {
      if (petalCountRef.current >= MAX_PETALS) return;

      const petal = document.createElement("span");
      petal.className = "cherry-petal";

      const size = 6 + Math.random() * 8;
      const rotate = Math.random() * 360;
      const duration = 900 + Math.random() * 900;
      const driftX = -35 + Math.random() * 70;
      const fallY = 30 + Math.random() * 60;

      petal.style.left = `${x}px`;
      petal.style.top = `${y}px`;
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 0.75}px`;
      petal.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;

      container.appendChild(petal);
      petalCountRef.current += 1;

      const animation = petal.animate(
        [
          { transform: `translate(-50%, -50%) rotate(${rotate}deg)`, opacity: 0.95 },
          {
            transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${fallY}px)) rotate(${rotate + 120}deg)`,
            opacity: 0,
          },
        ],
        {
          duration,
          easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
          fill: "forwards",
        },
      );

      animation.onfinish = () => {
        petal.remove();
        petalCountRef.current = Math.max(0, petalCountRef.current - 1);
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawnAtRef.current < SPAWN_INTERVAL_MS) return;
      lastSpawnAtRef.current = now;

      spawnPetal(event.clientX, event.clientY);
      if (Math.random() > 0.65) {
        spawnPetal(event.clientX + (Math.random() * 24 - 12), event.clientY + 6);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[60]" />;
}
