import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile, stats, education } from "../data/portfolioData";

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}
      <span className="text-[#00f5ff]">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-[#00f5ff] to-transparent" />
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.4em] text-[#00f5ff] uppercase">
              01 / Identity
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95]">
            Building things <br />
            <span className="text-gradient">that matter.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Left — photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto lg:mx-0"
          >
            <div className="relative w-[min(84vw,300px)] aspect-[4/5] md:w-[360px] md:h-[440px] md:aspect-auto">
              <span
                className="absolute inset-[-14px] rounded-3xl border-2 border-dashed border-[#00f5ff]/40"
                style={{ animation: "ringSpin 22s linear infinite" }}
              />
              <span
                className="absolute inset-[-28px] rounded-3xl border border-[#7c3aed]/30"
                style={{ animation: "ringSpin 30s linear reverse infinite" }}
              />
              <div className="relative w-full h-full rounded-2xl glass overflow-hidden glow-cyan">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(0,245,255,0.18), transparent 55%), radial-gradient(circle at 70% 80%, rgba(124,58,237,0.22), transparent 55%), linear-gradient(180deg, transparent 55%, rgba(5,8,16,0.75) 100%)"
                  }}
                />
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }}
                />
                <span className="absolute top-4 left-4 font-[family-name:var(--font-mono)] text-[10px] text-white/70 tracking-widest uppercase">
                  &lt;about me&gt;
                </span>
                <span className="absolute bottom-4 right-4 font-[family-name:var(--font-mono)] text-[10px] text-[#00f5ff] tracking-widest">
                  KIIT '25 · COGNIZANT
                </span>
                {/* Corner brackets */}
                <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00f5ff]" />
                <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#7c3aed]" />
              </div>
            </div>
          </motion.div>

          {/* Right — bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-5 text-white">
              Passionate developer &amp; problem solver.
            </h3>
            <div className="space-y-4 text-white/65 text-base md:text-lg leading-relaxed mb-10">
              {profile.bioLong.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="glass glass-hover rounded-2xl p-5 border-l-2 border-l-[#00f5ff]"
                >
                  <div className="font-[family-name:var(--font-display)] font-extrabold text-3xl md:text-4xl text-white leading-none mb-2">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-white/50 uppercase">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education strip */}
            <div className="pt-8 border-t border-white/10">
              <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.3em] text-[#00f5ff] mb-4 uppercase">
                &gt; education.log
              </div>
              {education.map((e) => (
                <div
                  key={e.school}
                  className="grid md:grid-cols-[180px_1fr] gap-3 py-3 border-b border-dashed border-white/5 last:border-0"
                >
                  <div className="font-[family-name:var(--font-mono)] text-xs text-white/50 tracking-wider pt-1">
                    {e.date}
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-display)] font-bold text-white">
                      {e.school}
                    </div>
                    <div className="text-sm text-white/60">{e.degree}</div>
                    <div className="text-xs text-white/40 mt-1">{e.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
