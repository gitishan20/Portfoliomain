import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiSend } from "react-icons/fi";
import { profile } from "../data/portfolioData";

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#00f5ff]" />
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.4em] text-[#00f5ff] uppercase">
              06 / Uplink
            </span>
            <span className="w-8 h-px bg-gradient-to-r from-[#00f5ff] to-transparent" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95]">
            Let's build <br />
            <span className="text-gradient">something.</span>
          </h2>
          <p className="mt-6 text-white/65 max-w-xl mx-auto">
            The fastest way to reach me is email. Drop a line and I'll get back
            within a day.
          </p>
        </motion.div>

        {/* Prominent direct email card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-2xl p-6 md:p-12 max-w-2xl mx-auto relative overflow-hidden"
        >
          <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent" />

          <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.3em] text-white/50 uppercase mb-4">
            &gt; write_to ::
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex flex-wrap items-center justify-center gap-2 md:gap-3 text-[clamp(1.1rem,4vw,2.2rem)] font-[family-name:var(--font-display)] font-semibold tracking-tight hover:scale-[1.02] transition-transform"
            aria-label={`Email ${profile.email}`}
          >
            <FiMail className="text-[#00f5ff] text-xl md:text-3xl" />
            <span className="text-gradient break-all">{profile.email}</span>
          </a>

          <div className="mt-8 flex justify-center">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.25em] uppercase text-white overflow-hidden"
              style={{ background: "linear-gradient(135deg, #00f5ff, #7c3aed)" }}
            >
              <FiSend /> Send Email
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="glass glass-hover rounded-full px-5 py-3 inline-flex items-center gap-2 text-sm"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="text-[#00f5ff]" /> LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
