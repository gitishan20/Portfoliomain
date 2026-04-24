import { motion } from "framer-motion";
import * as Si from "react-icons/si";
import * as Fa from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import { skillRows } from "../data/portfolioData";

// Oracle wordmark — Oracle's brand mark isn't shipped in react-icons.
// This SVG renders the stylised "ORACLE" lettering in their distinctive red.
// Oracle "O" mark — a red pill-shaped ring. Not shipped in react-icons.
function OracleLogo({ className, style }) {
  return (
    <svg
      viewBox="0 0 200 100"
      width="44"
      height="22"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Oracle"
    >
      <rect
        x="10"
        y="10"
        width="180"
        height="80"
        rx="40"
        ry="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="20"
      />
    </svg>
  );
}

function resolveIcon(name) {
  if (!name) return FiCode;
  if (name === "OracleLogo") return OracleLogo;
  if (name.startsWith("Si") && Si[name]) return Si[name];
  if (name.startsWith("Fa") && Fa[name]) return Fa[name];
  return FiCode;
}

// Brand colours for each skill's logo.
const BRAND = {
  "React":           "#61DAFB",
  "HTML":            "#E34F26",
  "CSS":             "#1572B6",
  "JavaScript":      "#F7DF1E",
  "Java":            "#F89820",
  "GitHub":          "#FFFFFF",
  "Python":          "#3776AB",
  "TensorFlow":      "#FF6F00",
  "Claude":          "#D97757",
  "GitHub Copilot":  "#FFFFFF",
  "Google Cloud":    "#4285F4",
  "SQL":             "#00618A",
  "MySQL":           "#4479A1",
  "PL/SQL":          "#F80000",
  "Oracle Cloud":    "#F80000"
};

const DIRS = ["left", "right", "left", "right"];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
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
              02 / Stack
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95]">
            Tools of <br />
            <span className="text-gradient">the trade.</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {skillRows.map((items, idx) => {
            const dir = DIRS[idx % DIRS.length];
            const loop = [...items, ...items, ...items];
            const durationSec = Math.max(28, items.length * 6);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className={`marquee marquee-${dir}`}>
                  <div
                    className="marquee-track"
                    style={{ animationDuration: `${durationSec}s` }}
                  >
                    <div className="marquee-group">
                      {loop.map((skill, i) => {
                        const Icon = resolveIcon(skill.icon);
                        const color = BRAND[skill.name] || "#ffffff";
                        return (
                          <span
                            key={`${idx}-${i}`}
                            className="skill-tile"
                            aria-label={skill.name}
                          >
                            <Icon
                              className="text-[1.6rem] shrink-0"
                              style={{ color }}
                            />
                            <span className="skill-tile-name">
                              {skill.name}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
