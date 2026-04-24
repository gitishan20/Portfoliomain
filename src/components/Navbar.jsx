import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, profile } from "../data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for active link
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[rgba(5,8,16,0.7)] border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center justify-between">
          <button onClick={() => go("home")} className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_10px_#00f5ff]" />
            <span
              className="font-[family-name:var(--font-display)] font-bold text-base tracking-widest text-white group-hover:text-gradient transition-colors"
            >
              {profile.shortName}
            </span>
            <span className="hidden sm:inline font-[family-name:var(--font-mono)] text-[10px] text-white/40 pl-2 border-l border-white/10 ml-1">
              v1.0
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`px-4 py-2 text-xs font-[family-name:var(--font-display)] tracking-widest uppercase rounded-full transition-all ${
                    active === link.id
                      ? "bg-[rgba(0,245,255,0.14)] text-white shadow-[inset_0_0_0_1px_rgba(0,245,255,0.4)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center glass rounded-xl"
            aria-label="Menu"
          >
            <span className="relative w-5 h-[1.5px]">
              <span
                className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-300 ${
                  open ? "top-0 rotate-45" : "-top-[6px]"
                }`}
              />
              <span
                className={`absolute left-0 top-0 w-full h-[1.5px] bg-white transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-300 ${
                  open ? "top-0 -rotate-45" : "top-[6px]"
                }`}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 md:hidden backdrop-blur-2xl bg-[rgba(5,8,16,0.92)]"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
              }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show:   { opacity: 1, y: 0 }
                  }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className="text-3xl font-[family-name:var(--font-display)] font-bold uppercase tracking-widest hover:text-gradient"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
