import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Skills } from "@/components/portfolio/Skills";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { IntroScreen } from "@/components/portfolio/IntroScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amirda Varshini M N — Full Stack Developer" },
      {
        name: "description",
        content:
          "Senior .NET-​ship Full Stack Developer with 7+ years building enterprise applications across utilities and education.",
      },
      { property: "og:title", content: "Amirda Varshini M N — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Senior .NET-​ship Full Stack Developer with 7+ years shipping production-grade software.",
      },
    ],
  }),
  component: Index,
});

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
};

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div className="cursor-glow hidden md:block" style={{ left: pos.x, top: pos.y }} />;
};

const Particles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full border border-border bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-110 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 12V2M2 7l5-5 5 5" />
      </svg>
    </button>
  );
};

function Index() {
  const [showIntro, setShowIntro] = useState(true);
  return (
    <>
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      <main className="min-h-screen relative">
        <ScrollProgress />
        <CursorGlow />
        <Particles />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}
