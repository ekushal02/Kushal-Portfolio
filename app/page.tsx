import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Playground from "@/components/Playground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BootSequence from "@/components/ui/BootSequence";

// Lazy-load the modal-driven UI (no SSR benefit, ships less initial JS)
const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette"), {
  ssr: false,
});
const KonamiTerminal = dynamic(() => import("@/components/ui/KonamiTerminal"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <BootSequence />
      <CustomCursor />
      <ScrollProgress />

      <Nav />

      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Playground />
        <Contact />
      </main>

      <Footer />

      <CommandPalette />
      <KonamiTerminal />

      {/* Ambient grid — fixed, behind everything */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </>
  );
}
