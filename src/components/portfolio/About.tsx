import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal<HTMLSpanElement>();

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = value;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [visible, value, duration]);

  return <span ref={ref}>{count}</span>;
};

export const About = () => {
  const stats = [
    { value: 7, suffix: "+", label: "Years Experience", showPlus: true },
    { value: 3, suffix: "", label: "Companies", showPlus: false },
    { value: 5, suffix: "+", label: "Major Projects", showPlus: true },
    { value: 10, suffix: "+", label: "Technologies", showPlus: true },
  ];
  const heading = useReveal<HTMLHeadingElement>();
  const text = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-3s" }} />

      <div className="container relative">
        <p className="font-mono-tag mb-4 uppercase tracking-wider text-white reveal-blur" style={{ transitionDelay: "0.1s" }}>
          // ABOUT
        </p>
        <h2
          ref={heading.ref}
          className={`font-display text-4xl md:text-6xl mb-6 max-w-3xl reveal ${heading.visible ? "is-visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          A developer who turns <span className="text-gradient italic animate-gradient">ideas</span> into production.
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <div
            ref={text.ref}
            className={`space-y-8 text-lg text-muted-foreground leading-relaxed reveal-left ${text.visible ? "is-visible" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <p className="text-justify">
              I'm Amirda Varshini — a Full Stack Developer based in India with seven years of
              experience building enterprise applications for utilities and education.
            </p>
            <p className="text-justify">
              I've worked across the complete software development lifecycle — from idea to
              production deployment — at <span className="text-foreground font-medium hover:text-accent transition-colors cursor-default">Cognizant</span>,
              <span className="text-foreground font-medium hover:text-accent transition-colors cursor-default"> Aspire Systems</span> and
              <span className="text-foreground font-medium hover:text-accent transition-colors cursor-default"> Sierra ODC</span>, building everything like utility
              infrastructure systems and education platforms.
            </p>
            <p className="text-justify">
              I focus on operational efficiency, data accuracy and continuous process improvement
              backed by analytics-driven insights.
            </p>
          </div>

          <div
            ref={grid.ref}
            className={`grid grid-cols-2 gap-4 reveal-right ${grid.visible ? "is-visible" : ""}`}
            style={{ transitionDelay: "0.4s" }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`glass-card rounded-2xl p-6 hover-lift hover-glow-border hover:border-primary/40 group relative overflow-hidden reveal-scale ${grid.visible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${0.4 + i * 0.15}s` }}
              >
                <p className="font-display text-4xl md:text-5xl text-gradient font-semibold mb-2">
                  <AnimatedCounter value={s.value} />
                  {s.showPlus && <span>+</span>}
                </p>
                <p className="font-mono-tag text-muted-foreground uppercase tracking-wider text-xs">{s.label}</p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
