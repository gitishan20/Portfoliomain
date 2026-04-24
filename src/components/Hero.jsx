import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { profile } from "../data/portfolioData";

/* Typewriter for the role line */
function useTypewriter(words, speed = 75, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[i];
    let t;
    if (!del && text === w) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && text === "") {
      setDel(false);
      setI((i + 1) % words.length);
    } else {
      t = setTimeout(() => {
        setText(del ? w.slice(0, text.length - 1) : w.slice(0, text.length + 1));
      }, del ? speed / 2 : speed);
    }
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);

  return text;
}

/* Hacker decode effect — each char cycles random glyphs, then locks in.
   Runs once on mount. Left-to-right reveal. */
const GLYPH_POOL =
  "!@#$%&*+=/?<>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randGlyph() {
  return GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)];
}

function HackerName({ name, baseDelay = 300, perChar = 110, cycleSpeed = 38 }) {
  // Render slots: { char, locked }
  const [slots, setSlots] = useState(() =>
    name.split("").map((c) => ({ real: c, shown: c === " " ? " " : randGlyph(), locked: c === " " }))
  );
  // Lock index — everything < lockIdx is solved.
  const [lockIdx, setLockIdx] = useState(0);
  const cursorRef = useRef(true);

  // Drive the scramble + reveal in a single rAF loop.
  useEffect(() => {
    const start = performance.now();
    let raf;
    let lastCycle = 0;
    let li = 0;

    const tick = (now) => {
      const elapsed = now - start;

      // Advance lock index over time
      const targetLock = Math.min(
        name.length,
        Math.max(0, Math.floor((elapsed - baseDelay) / perChar))
      );
      if (targetLock !== li) {
        li = targetLock;
        setLockIdx(li);
      }

      // Cycle unlocked glyphs
      if (now - lastCycle >= cycleSpeed) {
        lastCycle = now;
        setSlots((prev) =>
          prev.map((s, i) => {
            if (i < li || s.real === " ") return { ...s, shown: s.real, locked: true };
            return { ...s, shown: randGlyph(), locked: false };
          })
        );
      }

      if (li < name.length) raf = requestAnimationFrame(tick);
      else {
        // Final sweep — everything locked
        setSlots((prev) => prev.map((s) => ({ ...s, shown: s.real, locked: true })));
        cursorRef.current = false;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [name, baseDelay, perChar, cycleSpeed]);

  const spaceIdx = name.indexOf(" ");

  // Split into words so we can keep each word's letters on a single line
  // (no mid-word wrapping, but the line can still break between words).
  const words = [];
  {
    let start = 0;
    for (let i = 0; i <= name.length; i++) {
      if (i === name.length || name[i] === " ") {
        words.push({ start, end: i });
        start = i + 1;
      }
    }
  }

  return (
    <span
      className="inline-block leading-[1.1] font-[family-name:var(--font-mono)] font-bold tracking-tight"
      style={{ whiteSpace: "normal" }}
    >
      {words.map((w, wi) => {
        const inGradientZone = spaceIdx >= 0 && w.start > spaceIdx;
        const finalColor = inGradientZone ? "text-gradient" : "text-white";
        const isLastWord = wi === words.length - 1;
        return (
          <span
            key={wi}
            className="inline-block whitespace-nowrap align-baseline"
            style={{ marginRight: isLastWord ? 0 : "0.55ch" }}
          >
            {Array.from({ length: w.end - w.start }).map((_, li) => {
              const i = w.start + li;
              const s = slots[i];
              if (!s) return null;
              const glyphClass = s.locked ? finalColor : "text-[#00f5ff]";
              return (
                <span
                  key={i}
                  className={`inline-block text-center align-baseline ${glyphClass}`}
                  style={{
                    width: "1ch",
                    fontVariantNumeric: "tabular-nums",
                    textShadow: s.locked ? "none" : "0 0 14px rgba(0,245,255,0.75)",
                    transition: "color 0.12s ease, text-shadow 0.12s ease"
                  }}
                >
                  {s.shown}
                </span>
              );
            })}
            {isLastWord && (
              <span
                aria-hidden="true"
                className="inline-block align-baseline"
                style={{
                  width: "0.55ch",
                  height: "0.9em",
                  marginLeft: "0.2ch",
                  background: "#00f5ff",
                  boxShadow: "0 0 10px #00f5ff",
                  animation: "blink 0.8s steps(2) infinite",
                  transform: "translateY(0.05em)"
                }}
              />
            )}
          </span>
        );
      })}
    </span>
  );
}

export default function Hero() {
  const role = useTypewriter(profile.roles);

  const fullName = profile.name.trim();

  // Tilt effect for card
  const cardRef = useRef(null);
  const onCardMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    const rx = (y - 0.5) * -14;
    const ry = (x - 0.5) *  14;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const onCardLeave = () => {
    const el = cardRef.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Hacker decode: baseDelay(ms) + perChar(ms) * letters + buffer, converted to seconds.
  const hackBaseDelay = 150;
  const hackPerChar   = 55;
  const afterName     = (hackBaseDelay + fullName.length * hackPerChar + 150) / 1000;

  return (
    <section id="home" className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden pt-24 pb-16 md:pb-20">
      {/* Floating orbs */}
      <div aria-hidden="true" className="absolute inset-0 -z-[1] overflow-hidden">
        <div className="orb w-[420px] h-[420px] bg-[#7c3aed] top-[-120px] left-[-120px]" />
        <div className="orb w-[380px] h-[380px] bg-[#00f5ff] bottom-[-80px] right-[-80px]" style={{ animationDelay: "-6s" }} />
        <div className="orb w-[260px] h-[260px] bg-[#a855f7] top-1/2 right-[20%]" style={{ animationDelay: "-12s", opacity: 0.35 }} />
      </div>

      <div className="max-w-7xl mx-auto w-full px-5 lg:px-10 grid lg:grid-cols-[1.2fr_1fr] items-center gap-10 lg:gap-16">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex flex-wrap items-center gap-2 px-4 py-2 glass rounded-full font-[family-name:var(--font-mono)] text-[10px] md:text-[11px] tracking-widest mb-8 max-w-full"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
            <span>{profile.status.toUpperCase()}</span>
            <span className="text-white/30">//</span>
            <span className="text-white/60">COGNIZANT '26</span>
          </motion.div>

          <div className="mb-2 font-[family-name:var(--font-mono)] text-xs tracking-[0.35em] text-white/40 uppercase">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              &gt; decrypt_identity ::
            </motion.span>
          </div>

          <h1 className="leading-[1.1] tracking-tight text-[clamp(2rem,5.5vw,4.2rem)] mb-6">
            <HackerName
              name={fullName}
              baseDelay={hackBaseDelay}
              perChar={hackPerChar}
            />
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: afterName }}
            className="flex items-baseline flex-wrap gap-3 mb-6"
          >
            <span className="font-[family-name:var(--font-mono)] text-sm text-white/40">&gt; role.current =</span>
            <span className="font-[family-name:var(--font-mono)] text-base text-[#00f5ff] text-glow-cyan tracking-wider">
              {role}
            </span>
            <span className="inline-block w-[9px] h-[18px] bg-[#00f5ff] shadow-[0_0_10px_#00f5ff] translate-y-[2px] animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: afterName + 0.15 }}
            className="text-white/60 text-lg max-w-xl mb-10 leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: afterName + 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group relative px-7 py-4 rounded-full font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.25em] uppercase overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #00f5ff, #7c3aed)",
                color: "#fff"
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <a
              href={profile.cvUrl}
              download
              className="group px-7 py-4 rounded-full font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.25em] uppercase border border-white/20 text-white hover:text-[#00f5ff] hover:border-[#00f5ff] hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all flex items-center gap-2"
            >
              <FiDownload /> Download CV
            </a>
          </motion.div>
        </div>

        {/* Right — avatar/3D tilt card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto"
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
        >
          <div
            ref={cardRef}
            className="tilt-card relative w-[min(88vw,280px)] aspect-[5/6] md:w-[340px] md:h-[420px] rounded-2xl glass p-6 overflow-hidden"
          >
            {/* grid pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,245,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.12) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                transform: "translateZ(0)"
              }}
            />
            {/* photo + rings */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: "translateZ(40px)" }}
            >
              <div
                className="absolute w-60 h-60 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0,245,255,0.3), transparent 70%)",
                  animation: "meshDrift 12s ease-in-out infinite alternate"
                }}
              />
              <div
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-full glow-cyan overflow-hidden"
                style={{
                  padding: "3px",
                  background: "linear-gradient(135deg, #00f5ff, #7c3aed)",
                  transform: "translateZ(30px)"
                }}
              >
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover"
                  loading="eager"
                />
                <span
                  className="absolute inset-[-10px] rounded-full border-2 border-dashed border-white/40 pointer-events-none"
                  style={{ animation: "ringSpin 14s linear infinite" }}
                />
                <span
                  className="absolute inset-[-22px] rounded-full border border-[#00f5ff]/30 pointer-events-none"
                  style={{ animation: "ringSpin 20s linear reverse infinite" }}
                />
              </div>
            </div>
            {/* corner tag */}
            <div
              className="absolute top-4 left-4 font-[family-name:var(--font-mono)] text-[10px] tracking-widest text-white/40 uppercase"
              style={{ transform: "translateZ(20px)" }}
            >
              &lt;profile /&gt;
            </div>
            <div
              className="absolute bottom-4 right-4 font-[family-name:var(--font-mono)] text-[10px] tracking-widest text-[#00f5ff]"
              style={{ transform: "translateZ(20px)" }}
            >
              {profile.handle}
            </div>
            {/* corner brackets */}
            <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00f5ff]" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#7c3aed]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
