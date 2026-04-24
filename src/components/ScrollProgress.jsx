import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #00f5ff, #7c3aed, #00f5ff)",
          boxShadow: "0 0 10px rgba(0,245,255,0.6)"
        }}
      />

      <motion.button
        onClick={scrollToTop}
        aria-label="Back to top"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showTop ? 1 : 0,
          y:       showTop ? 0 : 20,
          pointerEvents: showTop ? "auto" : "none"
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-cyan hover:text-white glass-hover"
        style={{ color: "#00f5ff" }}
      >
        <FiArrowUp className="text-lg" />
      </motion.button>
    </>
  );
}
