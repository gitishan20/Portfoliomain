import { motion } from "framer-motion";
import { FiAward, FiCheckCircle, FiExternalLink } from "react-icons/fi";
import { certifications } from "../data/portfolioData";

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-[#00f5ff] to-transparent" />
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.4em] text-[#00f5ff] uppercase">
              05 / Credentials
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95]">
            Verified <br />
            <span className="text-gradient">certifications.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="flip-card relative h-[220px]"
            >
              <div className="flip-inner w-full h-full">
                {/* Front */}
                <div className="flip-face glass glass-hover rounded-2xl p-6 flex flex-col justify-between overflow-hidden">
                  <span className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[#00f5ff] to-[#7c3aed]" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-[#00f5ff]">
                        <FiAward className="text-xl" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-[family-name:var(--font-mono)] tracking-[0.2em] text-emerald-400 uppercase">
                        <FiCheckCircle /> Verified
                      </span>
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-[#00f5ff] uppercase mb-2">
                      {c.issuer}
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-[17px] text-white leading-tight mb-2">
                      {c.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-white/45 tracking-wider">
                      {c.date}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/35 tracking-[0.2em] uppercase">
                      Flip →
                    </span>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-face flip-back glass rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-[rgba(0,245,255,0.1)] to-[rgba(124,58,237,0.1)] border-[#00f5ff]/40">
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-white/50 uppercase mb-2">
                      Credential ID
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-sm text-[#00f5ff] break-all mb-4">
                      {c.id}
                    </div>
                    <p className="text-xs text-white/55 leading-relaxed">
                      Issued by {c.issuer} · {c.date}. Tap "Verify" to view the original
                      credential.
                    </p>
                  </div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase text-white border border-[#00f5ff] hover:bg-[#00f5ff] hover:text-[#050810] transition-colors"
                  >
                    Verify <FiExternalLink />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
