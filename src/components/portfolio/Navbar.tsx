import { useEffect, useState, useCallback } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = links.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-xl bg-background/70 border-b border-border shadow-lg shadow-background/20"
          : "py-6"
      }`}
    >
      <nav className="container flex items-center justify-between gap-8">
        <a href="#home" className="font-display text-2xl font-semibold group">
          <span className="text-accent">A</span>
          <span className="hover:text-accent transition-colors duration-300">mirda Varshini M N</span>
        </a>

        <ul className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm text-muted-foreground absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                className={`story-link transition-colors duration-300 ${
                  activeSection === l.href.slice(1) ? "text-foreground" : "hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
              {activeSection === l.href.slice(1) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-scale-in" />
              )}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300"
        >
          Hire Me
        </a>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-md border border-border hover:border-primary/40 transition-colors"
          onClick={() => setOpen(!open)}
        >
          <div className={`w-5 h-0.5 bg-foreground mb-1.5 transition-transform duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-5 h-0.5 bg-foreground mb-1.5 transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-foreground transition-transform duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 rounded-2xl glass-card p-6 flex flex-col gap-4">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className={`text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all duration-300 ${
                open ? "animate-slide-up" : ""
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium text-center hover:shadow-[var(--shadow-glow)] transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
};
