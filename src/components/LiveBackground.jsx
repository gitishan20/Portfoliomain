import { useEffect, useRef } from "react";

/**
 * LiveBackground — a modern deep-space backdrop.
 *
 *   • Parallax starfield at 3 depth layers with a slow downward drift.
 *   • Gentle per-star twinkle (phase-offset sine wave).
 *   • Brighter foreground stars have a subtle cyan glow for a tech-space feel.
 *   • Occasional shooting star streaks diagonally across the viewport.
 *
 * No cursor interaction — reads as a quiet, professional atmosphere.
 */
export default function LiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0, height = 0;
    let stars = [];
    const shooting = [];
    let lastShoot = performance.now();

    const starCount = isMobile ? 110 : 200;

    const seed = () => {
      stars = Array.from({ length: starCount }, () => {
        const depth = Math.random();  // 0 (far) -> 1 (near)
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.35 + depth * 1.5,
          baseAlpha: 0.12 + depth * 0.55,
          twinkleSpeed: 0.4 + Math.random() * 1.6,
          twinklePhase: Math.random() * Math.PI * 2,
          vy: 0.02 + depth * 0.08,
          depth
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = Math.floor(width  * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width  = width  + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seed();
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let raf;

    const maybeSpawnShooting = (now) => {
      if (prefersReduced) return;
      // One shooting star every ~5–11 seconds.
      if (now - lastShoot < 5000 + Math.random() * 6000) return;
      lastShoot = now;
      const angle = (Math.PI / 5) + (Math.random() - 0.5) * 0.35;
      const speed = 6 + Math.random() * 4;
      shooting.push({
        x: Math.random() * width * 0.8,
        y: -40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 90 + Math.random() * 80,
        alpha: 1
      });
    };

    const step = (now) => {
      t += prefersReduced ? 0.002 : 0.01;

      ctx.clearRect(0, 0, width, height);

      // ── Stars ────────────────────────────────────────────────
      for (const s of stars) {
        s.y += s.vy;
        if (s.y > height + 8) {
          s.y = -8;
          s.x = Math.random() * width;
        }
        const twinkle = 0.55 + 0.45 * Math.sin(s.twinklePhase + t * s.twinkleSpeed);
        const alpha = s.baseAlpha * twinkle;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 241, 252, ${alpha})`;
        // Subtle cyan glow on near stars only — feels technical without being loud.
        if (s.depth > 0.72) {
          ctx.shadowColor = "rgba(0, 245, 255, 0.75)";
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // ── Shooting stars ───────────────────────────────────────
      maybeSpawnShooting(now);
      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha *= 0.985;

        const mag = Math.hypot(s.vx, s.vy);
        const tx = s.x - (s.vx / mag) * s.len;
        const ty = s.y - (s.vy / mag) * s.len;

        const grad = ctx.createLinearGradient(s.x, s.y, tx, ty);
        grad.addColorStop(0, `rgba(235, 241, 252, ${s.alpha})`);
        grad.addColorStop(0.4, `rgba(0, 245, 255, ${s.alpha * 0.5})`);
        grad.addColorStop(1, "rgba(0, 245, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        if (s.x > width + 120 || s.y > height + 120 || s.alpha < 0.02) {
          shooting.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="live-bg" aria-hidden="true" />;
}
