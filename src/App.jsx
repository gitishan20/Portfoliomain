import Navbar         from "./components/Navbar";
import Hero           from "./components/Hero";
import About          from "./components/About";
import Skills         from "./components/Skills";
import Projects       from "./components/Projects";
import Experience     from "./components/Experience";
import Certifications from "./components/Certifications";
import Contact        from "./components/Contact";
import Footer         from "./components/Footer";
import CustomCursor   from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import LiveBackground from "./components/LiveBackground";

function WaveDivider({ flip = false }) {
  return (
    <svg
      className="wave-divider"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      <path
        d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
        fill="rgba(0, 245, 255, 0.04)"
      />
      <path
        d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30"
        fill="none"
        stroke="rgba(0, 245, 255, 0.25)"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function App() {
  return (
    <>
      {/* Background layers */}
      <div className="mesh-bg"  aria-hidden="true" />
      <div className="bg-orbs"  aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
      </div>
      <div className="noise-bg" aria-hidden="true" />
      <LiveBackground />

      {/* Globals */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Content */}
      <main className="relative z-0">
        <Hero />
        <WaveDivider />
        <About />
        <WaveDivider flip />
        <Skills />
        <WaveDivider />
        <Projects />
        <WaveDivider flip />
        <Experience />
        <WaveDivider />
        <Certifications />
        <WaveDivider flip />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
