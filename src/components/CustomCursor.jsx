import { useEffect, useRef } from "react";

/**
 * CustomCursor — native OS cursor stays visible. A soft circular halo
 * follows tightly behind it for ambiance.
 */
export default function CustomCursor() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let tx = window.innerWidth  / 2;
    let ty = window.innerHeight / 2;
    let gx = tx, gy = ty;
    let raf;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const HOVER_SEL =
      "a, button, input, textarea, [data-cursor-hover], [role='button']";
    const onOver = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SEL)) {
        glow.classList.add("hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SEL)) {
        glow.classList.remove("hover");
      }
    };

    const tick = () => {
      // Tight follow so the glow feels responsive, not laggy.
      gx += (tx - gx) * 0.35;
      gy += (ty - gy) * 0.35;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={glowRef} className="cc-glow" aria-hidden="true" />;
}
