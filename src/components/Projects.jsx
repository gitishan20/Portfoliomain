import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiStar } from "react-icons/fi";
import { projects, projectFilters } from "../data/portfolioData";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-[#00f5ff] to-transparent" />
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.4em] text-[#00f5ff] uppercase">
              03 / Work
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95]">
            Selected <br />
            <span className="text-gradient">projects.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-5 py-2.5 rounded-full font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase transition-all ${
                filter === f
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filterPill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))",
                    border: "1px solid #00f5ff",
                    boxShadow: "0 0 18px rgba(0,245,255,0.35)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative glass rounded-2xl overflow-hidden glass-hover"
              >
                {p.featured && (
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#00f5ff]/30 to-[#7c3aed]/30 border border-[#00f5ff]/50 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-white backdrop-blur">
                    <FiStar className="text-[#00f5ff]" /> Featured
                  </span>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[rgba(5,8,16,0.65)] opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-[#00f5ff] hover:border-[#00f5ff] transition-colors"
                        aria-label="Live demo"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <div className="inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-[#00f5ff] uppercase px-2 py-0.5 border border-[#00f5ff]/30 bg-[rgba(0,245,255,0.08)] rounded mb-3">
                    {p.category}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="font-[family-name:var(--font-mono)] text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60 tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
