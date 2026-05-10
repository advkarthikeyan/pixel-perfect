import { Linkedin, Mail, Phone, Briefcase, ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import profile from "@/assets/profile.png";

const phrases = ["I build.", "I scale.", "I ship software."];

const KineticTagline = () => {
  const [phase, setPhase] = useState<"dissolve-in" | "hold" | "dissolve-out">("dissolve-in");
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setPhase("dissolve-out");
    setTimeout(() => {
      setIndex((i) => (i + 1) % phrases.length);
      setPhase("dissolve-in");
    }, 600);
  }, []);

  useEffect(() => {
    if (phase === "dissolve-in") {
      const t = setTimeout(() => setPhase("hold"), 700);
      return () => clearTimeout(t);
    }
    if (phase === "hold") {
      const t = setTimeout(next, 1800);
      return () => clearTimeout(t);
    }
  }, [phase, next]);

  const animClass =
    phase === "dissolve-in"
      ? "dissolve-in"
      : phase === "dissolve-out"
      ? "dissolve-out"
      : "dissolve-hold";

  return (
    <div
      className="font-display text-xl md:text-2xl lg:text-3xl font-semibold mb-8 text-amber-300 h-[1.3em] overflow-hidden"
      aria-label="I build. I scale. I ship software."
    >
      <div className={`dissolve-word ${animClass}`}>
        {phrases[index].split("").map((char, i) => (
          <span
            key={i}
            className="inline-block dissolve-char"
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
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
        if (visibleCount < suffix.length) {
          setVisibleCount((v) => v + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (visibleCount > 0) {
          setVisibleCount((v) => v - 1);
        } else {
          setDeleting(false);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [visibleCount, deleting]);

  return (
    <span className="block">
      <span className="text-foreground">/Dev</span>
      <span className="text-foreground">
        {suffix.slice(0, visibleCount)}
      </span>
      <span className="text-white animate-blink">_</span>
    </span>
  );
};

export const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Morphing background blob */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/5 animate-morph blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-accent/5 animate-morph blur-3xl" style={{ animationDelay: "-4s" }} />

      <div className="container grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          {/* Status badge - staggered entrance */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/40 mb-8 animate-slide-up hover-glow-border cursor-default"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
            </span>
            <span className="text-xs text-slate-200">Open to Full Stack Developer opportunities</span>
          </div>

          {/* Tech tags - staggered */}
          <p
            className="font-mono-tag text-white mb-6 uppercase tracking-wider animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-white">code</span> · <span className="text-white">design</span> · <span className="text-white">ship</span>
          </p>

          {/* Main heading - Full Stack Dev_ with typing ELOPER */}
          <h1 className="font-sans font-black uppercase tracking-tight text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 animate-clip-reveal" style={{ animationDelay: "0.3s" }}>
            <span className="block text-foreground">Full</span>
            <span className="block text-foreground">Stack</span>
            <TypingDev />
          </h1>

          {/* Kinetic typography tagline - text dissolve */}
          <KineticTagline />

          {/* Description - blur in */}
          <p
            className="text-lg text-muted-foreground max-w-xl mb-10 leading-7 tracking-normal whitespace-normal [word-spacing:0] sm:leading-relaxed text-justify animate-blur-in"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="block mb-3 font-medium text-foreground">
              A Senior .NET-Angular Full Stack Developer (7+ Years)
            </span>
            Innovative software engineer dedicated to high-quality data and operational excellence. Expert at bridging the gap between complex backend logic and intuitive frontend usability, utilizing analytical insights to solve business challenges and improve system performance.
          </p>

          {/* CTA buttons - scale in */}
          <div className="flex flex-wrap items-center gap-4 mb-10 animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <a
              href="#experience"
              className="group relative px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-[var(--shadow-glow)] transition-all overflow-hidden hover-ripple"
            >
              <span className="relative z-10">View My Work</span>
              <span className="relative z-10 ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full border border-border text-foreground hover:bg-card hover-scale transition-all hover-glow-border"
            >
              Get in Touch
            </a>
          </div>

          {/* Social icons - staggered scale in */}
          <div className="flex items-center gap-5">
            <SocialIcon href="https://www.linkedin.com/in/amirda-varshini1114vakkv/" label="LinkedIn" delay={0.7}>
              <Linkedin className="w-4 h-4" />
            </SocialIcon>
            <SocialIcon href="https://www.naukri.com/mnjuser/profile?id=&altresid" label="Naukri" delay={0.8}>
              <Briefcase className="w-4 h-4" />
            </SocialIcon>
            <SocialIcon href="mailto:amirdavarshini14@gmail.com" label="Email" delay={0.9}>
              <Mail className="w-4 h-4" />
            </SocialIcon>
            <SocialIcon href="tel:+918248445188" label="Phone" delay={1.0}>
              <Phone className="w-4 h-4" />
            </SocialIcon>
          </div>
        </div>

        {/* Profile image - slide in from right */}
        <div className="relative flex justify-center lg:justify-end lg:-mt-16 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
          <div className="relative">
            {/* Animated glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/30 blur-3xl rounded-full animate-pulse" style={{ animationDuration: "4s" }} />

            {/* Spinning border ring */}
            <div className="absolute -inset-3 rounded-full border border-primary/20 animate-spin-slow" />
            <div className="absolute -inset-6 rounded-full border border-dashed border-accent/10 animate-spin-slow" style={{ animationDirection: "reverse" }} />

            <div className="relative w-[280px] h-[320px] md:w-[360px] md:h-[420px] hex-clip bg-gradient-to-br from-primary/20 to-accent/10 p-1 animate-float">
              <img
                src={profile}
                alt="Amirda Varshini MN — Full Stack Developer"
                width={400}
                height={460}
                className="w-full h-full object-cover hex-clip"
              />
            </div>

            <FloatingTag
              className="-top-4 -left-6 hover-scale animate-float"
              style={{ animationDuration: "5s", animationDelay: "0s" }}
              label="Experience"
              value="7+ Years"
              color="amber"
              delay={0.8}
            />
            <FloatingTag
              className="top-1/2 -right-8 hover-scale animate-float"
              style={{ animationDuration: "7s", animationDelay: "-2s" }}
              label="Stack"
              value=".NET 8"
              color="rose"
              delay={1.0}
            />
            <FloatingTag
              className="-bottom-4 left-4 hover-scale animate-float"
              style={{ animationDuration: "6s", animationDelay: "-3s" }}
              label="Frontend"
              value="Angular 12"
              color="pink"
              delay={1.2}
            />
          </div>
        </div>
      </div>

      {/* Marquee tech strip */}
      <div className="mt-20 overflow-hidden border-y border-border py-6 bg-card/20">
        <div className="marquee font-mono-tag text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8">
              {[".NET 8", "ANGULAR", "C#", "SQL SERVER", "WEB API", "ENTITY FRAMEWORK", "MONGODB", "AZURE DEVOPS", "JAVASCRIPT", "MVC"].map((s, idx) => (
                <span key={s} className="flex items-center gap-8 whitespace-nowrap animate-shimmer rounded px-2 py-1">
                  <span style={idx % 2 === 1 ? { color: "#ff4c6a" } : undefined}>{s}</span>
                  <span className="text-accent">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="font-mono-tag text-[10px]">SCROLL</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

const SocialIcon = ({ href, label, children, delay = 0 }: { href: string; label: string; children: React.ReactNode; delay?: number }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent hover:bg-accent/10 transition-all hover:scale-110 hover:-translate-y-1 animate-scale-in"
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </a>
);

const FloatingTag = ({
  className,
  label,
  value,
  color,
  delay = 0,
  style,
}: {
  className: string;
  label: string;
  value: string;
  color: "primary" | "accent" | "secondary" | "purple" | "amber" | "pink" | "rose";
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const colorClass = {
    primary: "text-primary",
    accent: "text-accent",
    secondary: "text-secondary",
    purple: "text-purple-400",
    amber: "font-mono-tag text-green-400",
    pink: "font-mono-tag text-violet-300",
    rose: "font-mono-tag text-rose-500",
  }[color];
  return (
    <div
      className={`absolute glass-card rounded-2xl px-4 py-3 ${className}`}
      style={style}
    >
      <p className={`font-mono-tag ${colorClass}`}>{label}</p>
      <p className="font-display text-lg font-semibold">{value}</p>
    </div>
  );
};
