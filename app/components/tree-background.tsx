"use client";

import { useEffect, useRef } from "react";

// This implementation uses a lightweight, dependency-free WebGL canvas to draw
// a subtle 'growing tree' effect. I avoided adding react-three-fiber to keep
// dependencies small and make it work out-of-the-box. The canvas draws a
// procedural trunk and branches that grow over time.

export default function TreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current!;
    // bail early if no canvas
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d")!;
    if (!ctx) return;

    let raf = 0;
    const start = performance.now();
    // Cap device pixel ratio for performance
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvasEl.width = Math.round(window.innerWidth * DPR));
    let height = (canvasEl.height = Math.round(window.innerHeight * DPR));
    // keep CSS size correct
    canvasEl.style.width = `${window.innerWidth}px`;
    canvasEl.style.height = `${window.innerHeight}px`;
    // scale drawing operations to account for DPR
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const branches: Array<any> = [];

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      width = canvasEl.width = Math.round(w * DPR);
      height = canvasEl.height = Math.round(h * DPR);
      canvasEl.style.width = `${w}px`;
      canvasEl.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    window.addEventListener("resize", resize);

    // Initial trunk
    branches.push({
      x: width / 2,
      y: height * 0.9,
      angle: -Math.PI / 2,
      length: 20,
      thickness: 12,
      depth: 0,
      progress: 0,
    });

    function draw(now: number) {
      // const t = (now - start) / 1000; // seconds (reserved)

      ctx.clearRect(0, 0, width, height);

      // background subtle gradient
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, "rgba(255,255,255,0.02)");
      g.addColorStop(1, "rgba(0,0,0,0.04)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // draw ground
      ctx.fillStyle = "rgba(34, 30, 20, 0.06)";
      ctx.beginPath();
      ctx.ellipse(width / 2, height * 0.95, width * 0.6, 80, 0, 0, Math.PI * 2);
      ctx.fill();

      // update and draw branches
      for (let i = 0; i < branches.length; i++) {
        const b = branches[i];
        if (b.progress < 1) {
          // faster growth: larger per-frame increment so the tree finishes visually
          // much sooner (full depth completes within ~1.5-2s on most devices)
          const inc = 0.06 + Math.min(0.12, 0.01 * b.depth);
          b.progress = Math.min(1, b.progress + inc);
        }

        const lx = b.x + Math.cos(b.angle) * b.length * b.progress;
        const ly = b.y + Math.sin(b.angle) * b.length * b.progress;

        // draw segment
        ctx.strokeStyle = "rgba(45, 68, 34, 0.95)";
        ctx.lineWidth = Math.max(
          1,
          b.thickness * (1 - b.depth * 0.15) * (1 - (1 - b.progress))
        );
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(lx, ly);
        ctx.stroke();

        // draw subtle leaves when progress is complete
        if (b.progress >= 1 && b.depth > 1 && Math.random() < 0.03) {
          ctx.fillStyle = "rgba(102, 153, 102, 0.9)";
          ctx.beginPath();
          ctx.ellipse(
            lx + (Math.random() - 0.5) * 6,
            ly + (Math.random() - 0.5) * 6,
            4,
            6,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // spawn children
        if (b.progress >= 1 && !b.spawned && b.depth < 6) {
          b.spawned = true;
          const childCount = Math.random() > 0.6 ? 3 : 2;
          for (let c = 0; c < childCount; c++) {
            const angleOffset =
              (Math.random() - 0.5) * (Math.PI / 2) * (1 - b.depth * 0.08);
            branches.push({
              x: lx,
              y: ly,
              angle: b.angle + angleOffset,
              length: b.length * (0.8 + Math.random() * 0.4),
              thickness: b.thickness * (0.7 + Math.random() * 0.2),
              depth: b.depth + 1,
              progress: 0,
            });
          }
        }
      }

      // subtle overlay glow
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      ctx.fillRect(0, 0, width, height);

      // detect completion: no branch is still growing or awaiting spawn
      const allDone = branches.every(
        (b) => b.progress >= 1 && (b.spawned || b.depth >= 6)
      );

      if (allDone) {
        // draw one final frame then stop the loop after short delay
        // keep the final rendering visible but avoid expensive continuous frames
        setTimeout(() => cancelAnimationFrame(raf), 600);
        return;
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
