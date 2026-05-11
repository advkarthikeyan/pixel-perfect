import { Linkedin, Mail, Phone, Briefcase, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import profile from "@/assets/profile.png";

// --- 1. THE ANTI-GRAVITY PARTICLE BACKGROUND ---
const AntiGravityBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5 + 0.5;
        this.density = (Math.random() * 20) + 1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(226, 232, 240, 0.4)"; // Slate-200 effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * this.density;
          this.y -= (dy / distance) * force * this.density;
        } else {
          // Drifting upwards and returning to base
          this.baseY -= 0.2; // Constant upward flow
          if (this.baseY < -10) this.baseY = canvas.height + 10;
          
          if (this.x !== this.baseX) {
            this.x -= (this.x - this.baseX) / 20;
          }
          if (this.y !== this.baseY) {
            this.y -= (this.y - this.baseY) / 20;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// --- 2. TYPING & TAGLINE COMPONENTS ---
const KineticTagline = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === 0) timer = setTimeout(() => setStage(1), 1500);
    else if (stage === 1) timer = setTimeout(() => setStage(2), 1500);
    else if (stage === 2) timer = setTimeout(() => setStage(3), 600);
    else if (stage === 3) timer = setTimeout(() => setStage(4), 2000);
    else if (stage === 4) timer = setTimeout(() => setStage(0), 600);
    return () => clearTimeout(timer);
  }, [stage]);

  const renderChars = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block roll-char" style={{ animationDelay: `${i * 0.01}s` }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div className="font-display text-xl md:text-2xl lg:text-3xl font-semibold mb-8 h-[1.3em] overflow-hidden flex gap-3" style={{ color: "#ff4c6a" }}>
      {(stage === 0 || stage === 1 || stage === 2) && (
        <>
          <div className={stage === 2 ? "roll-out" : "roll-in"}>{renderChars("I build.")}</div>
          {stage >= 1 && <div className={stage === 2 ? "roll-out" : "roll-in"}>{renderChars("I scale.")}</div>}
        </>
      )}
      {(stage === 3 || stage === 4) && (
        <div className={stage === 4 ? "roll-out" : "roll-in"}>{renderChars("I ship software.")}</div>
      )}
    </div>
  );
};

const TypingDev = () => {
  const suffix = "ELOPER";
  const [visibleCount, setVisibleCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const speed = deleting ? 50 : 150;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (visibleCount < suffix.length) setVisibleCount((v) => v + 1);
        else setTimeout(() => setDeleting(true), 2000);
      } else {
        if (visibleCount > 0) setVisibleCount((v) => v - 1);
        else setDeleting(false);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [visibleCount, deleting]);

  return (
    <span className="block">
      <span className="text-foreground">Dev</span>
      <span className="text-foreground">{suffix.slice(0, visibleCount)}</span>
      <span className="text-white animate-blink">_</span>
    </span>
  );
};

// --- 3. MAIN HERO COMPONENT ---
export const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <AntiGravityBackground />

      {/* Rectified background blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/5 animate-morph blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-accent/5 animate-morph blur-3xl" style={{ animationDelay: "-4s" }} />

      <div className="container relative z-10 grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/40 mb-8 animate-slide-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-90" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
            </span>
            <span className="text-xs text-slate-200">Open to Full Stack Developer opportunities</span>
          </div>

          <p className="font-mono text-white mb-6 uppercase tracking-wider animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <span className="font-serif text-slate-400">code</span> · <span className="font-serif text-slate-400">design</span> · <span className="font-serif text-slate-400">ship</span>
          </p>

          <h1 className="font-sans font-black uppercase tracking-tight text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 animate-clip-reveal" style={{ animationDelay: "0.3s" }}>
            <span className="block text-foreground">Full</span>
            <span className="block text-foreground">Stack</span>
            <TypingDev />
          </h1>

          <KineticTagline />

          <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-7 text-justify animate-blur-in" style={{ animationDelay: "0.5s" }}>
            <span className="block mb-3 font-medium text-foreground">A Senior .NET-Angular Full Stack Developer (7+ Years)</span>
            Innovative software engineer dedicated to high-quality data and operational excellence. Expert at bridging the gap between complex backend logic and intuitive frontend usability.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10 animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <a href="#experience" className="group relative px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg transition-all overflow-hidden">
              <span className="relative z-10">View My Work →</span>
            </a>
            <a href="#contact" className="px-7 py-3.5 rounded-full border border-border text-foreground hover:bg-card transition-all">Get in Touch</a>
          </div>

          <div className="flex items-center gap-5">
            <SocialIcon href="https://linkedin.com" label="LinkedIn" delay={0.7}><Linkedin className="w-4 h-4" /></SocialIcon>
            <SocialIcon href="https://naukri.com" label="Naukri" delay={0.8}><Briefcase className="w-4 h-4" /></SocialIcon>
            <SocialIcon href="mailto:amirdavarshini14@gmail.com" label="Email" delay={0.9}><Mail className="w-4 h-4" /></SocialIcon>
            <SocialIcon href="tel:+918248445188" label="Phone" delay={1.0}><Phone className="w-4 h-4" /></SocialIcon>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end lg:-mt-16 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/30 blur-3xl rounded-full animate-pulse" />
            <div className="relative w-[280px] h-[320px] md:w-[360px] md:h-[420px] hex-clip bg-gradient-to-br from-primary/20 to-accent/10 p-1 animate-float">
              <img src={profile} alt="Amirda Varshini MN" className="w-full h-full object-cover hex-clip" />
            </div>
            <FloatingTag className="-top-4 -left-6" label="Experience" value="7+ Years" color="amber" delay={0.8} />
            <FloatingTag className="top-1/2 -right-8" label="Stack" value=".NET" color="rose" delay={1.0} />
            <FloatingTag className="-bottom-4 left-4" label="Frontend" value="Angular" color="pink" delay={1.2} />
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({ href, label, children, delay }: any) => (
  <a href={href} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all animate-scale-in" style={{ animationDelay: `${delay}s` }}>
    {children}
  </a>
);

const FloatingTag = ({ className, label, value, color, delay }: any) => {
  const colorClass = { amber: "text-green-400", rose: "text-rose-500", pink: "text-violet-500" }[color as 'amber'|'rose'|'pink'];
  return (
    <div className={`absolute glass-card rounded-2xl px-4 py-3 ${className}`} style={{ animationDelay: `${delay}s` }}>
      <p className={`font-mono-tag ${colorClass}`}>{label}</p>
      <p className="font-display text-lg font-semibold">{value}</p>
    </div>
  );
};