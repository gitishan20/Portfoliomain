import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiBriefcase, FiCheck } from "react-icons/fi";
import { experiences } from "../data/portfolioData";

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 lg:px-10">
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
              04 / Timeline
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95]">
            Where I've <br />
            <span className="text-gradient">shipped.</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Timeline line — draws itself */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-white/10" />
          <motion.div
            className="absolute left-5 md:left-1/2 top-0 w-px md:-translate-x-1/2 tl-line-gradient"
            style={{ height: lineHeight }}
          />

          <ul className="space-y-12">
            {experiences.map((xp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={xp.company + xp.role} className="relative">
                  {/* Marker */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="absolute left-5 md:left-1/2 top-5 -translate-x-1/2 w-5 h-5 rounded-full z-10 flex items-center justify-center"
                    style={{
                      background: "#050810",
                      border: "2px solid #00f5ff",
                      boxShadow: "0 0 14px rgba(0,245,255,0.7)"
                    }}
                  >
                    {xp.current && (
                      <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
                    )}
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className={`relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${
                      isLeft ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div className={`hidden md:block ${isLeft ? "pr-10 text-right" : "pl-10 text-left"}`} />
                    <div className={`md:${isLeft ? "pl-10" : "pr-10"}`}>
                      <div className="glass glass-hover rounded-2xl p-6">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <span className="font-[family-name:var(--font-mono)] text-xs text-white/50 tracking-wider">
                            {xp.date}
                          </span>
                          {xp.current ? (
                            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 border border-emerald-400/60 text-emerald-300 bg-emerald-400/10 rounded-full">
                              Current
                            </span>
                          ) : (
                            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 border border-white/20 text-white/50 rounded-full">
                              Past
                            </span>
                          )}
                        </div>
                        <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-white mb-1 flex items-center gap-2">
                          <FiBriefcase className="text-[#00f5ff]" />
                          {xp.role}
                        </h3>
                        <div className="font-[family-name:var(--font-mono)] text-sm text-[#00f5ff] tracking-wide mb-4">
                          {xp.company}
                        </div>
                        <ul className="space-y-2">
                          {xp.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-2 text-sm text-white/65 leading-relaxed">
                              <FiCheck className="mt-1 text-[#00f5ff] flex-shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
