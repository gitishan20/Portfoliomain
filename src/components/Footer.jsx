import { FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="relative pt-10 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.25em] text-white/40 uppercase">
          © {new Date().getFullYear()} · {profile.name.toUpperCase()}
        </div>
        <div className="flex items-center gap-3">
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full glass glass-hover flex items-center justify-center text-white/70 hover:text-[#00f5ff]" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href={profile.socials.email}                                      className="w-9 h-9 rounded-full glass glass-hover flex items-center justify-center text-white/70 hover:text-[#00f5ff]" aria-label="Email"><FiMail /></a>
        </div>
      </div>
    </footer>
  );
}
