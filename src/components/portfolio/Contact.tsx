import { Linkedin, Mail, Phone, Briefcase, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export const Contact = () => {
  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: "amirdavarshini14@gmail.com",
      href: "mailto:amirdavarshini14@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8248445188",
      href: "tel:+918248445188",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/amirda-varshini",
      href: "https://www.linkedin.com/in/amirda-varshini-mn/",
    },
    {
      icon: Briefcase,
      label: "Naukri",
      value: "View profile",
      href: "https://www.naukri.com/mnjuser/profile?id=&altresid",
    },
  ];

  const heading = useReveal<HTMLHeadingElement>();

  return (
    <section id="contact" className="py-24 md:py-32 bg-card/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-5s" }} />

      <div className="container relative">
        <p className="font-mono-tag mb-4 text-green reveal-blur" style={{ transitionDelay: "0.1s" }}>
          // Contact
        </p>
        <h2
          ref={heading.ref}
          className={`font-display text-4xl md:text-7xl mb-8 max-w-3xl reveal ${heading.visible ? "is-visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          Let's build <span className="text-gradient italic animate-gradient">something</span> together.
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mb-12 reveal-blur" style={{ transitionDelay: "0.3s" }}>
          Open to Full Stack Developer opportunities and freelance contracts.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((c, i) => (
            <ContactCard key={c.label} channel={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ channel: c, index }: { channel: { icon: any; label: string; value: string; href: string }; index: number }) => {
  const Icon = c.icon;
  const { ref, visible } = useReveal<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href={c.href}
      target={c.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`glass-card rounded-2xl p-6 hover:border-accent/50 hover-lift hover-glow-border group relative overflow-hidden reveal-scale ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 120 + 400}ms` }}
    >
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <p className="font-mono-tag text-muted-foreground mb-1">{c.label}</p>
        <p className="font-medium break-all flex items-center gap-1">
          {c.value}
          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </p>
      </div>
      {/* Shimmer sweep on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer pointer-events-none" />
    </a>
  );
};

export const Footer = () => (
  <footer className="border-t border-border py-10 relative overflow-hidden">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p className="hover:text-foreground transition-colors duration-300">© {new Date().getFullYear()} Amirda Varshini MN. Built with care.</p>
      <p className="font-mono-tag animate-shimmer rounded px-2 py-1">FULL STACK · .NET · ANGULAR</p>
    </div>
  </footer>
);
