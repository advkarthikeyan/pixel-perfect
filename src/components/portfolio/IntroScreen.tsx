import { useEffect, useState, useCallback } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [typedName, setTypedName] = useState("");
  const [visibleWords, setVisibleWords] = useState<number>(0);

  const fullName = "Amirda Varshini M N";
  const taglineWords = [
    { text: "I build.", color: "intro-big-a font-display text-[10rem] md:text-[14rem] lg:text-[18rem] font-bold leading-none text-accent text-fuchsia-600" },
    { text: "I scale.", color: "text-accent" },
    { text: "I ship software.", color: "text-gradient" },
  ];

  const handleComplete = useCallback(onComplete, [onComplete]);

  // Typewriter for name
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullName.length) {
        setTypedName(fullName.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Stagger tagline words after name finishes
  useEffect(() => {
    const nameDuration = fullName.length * 80 + 400;
    taglineWords.forEach((_, i) => {
      setTimeout(() => setVisibleWords((v) => v + 1), nameDuration + i * 700);
    });
  }, []);

  // Exit after everything is shown
  useEffect(() => {
    const nameDuration = fullName.length * 80 + 400;
    const taglineDuration = taglineWords.length * 700 + 800;
    const totalDuration = nameDuration + taglineDuration + 600;
    const exitTimer = setTimeout(() => setPhase("exit"), totalDuration);
    const completeTimer = setTimeout(handleComplete, totalDuration + 800);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [handleComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background intro-screen ${
        phase === "exit" ? "intro-exit" : ""
      }`}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.06)_0%,transparent_70%)]" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Big "A" letter */}
        <div className="overflow-hidden">
          <span className="intro-big-a font-display text-[10rem] md:text-[14rem] lg:text-[18rem] font-bold leading-none text-accent">
            A
          </span>
        </div>

        {/* Name with typewriter */}
        <div className="h-10 md:h-12 flex items-center justify-center">
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            {typedName}
            <span className="animate-blink text-accent">|</span>
          </h2>
        </div>

        {/* Tagline with staggered colored word reveal */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 min-h-[2rem]">
          {taglineWords.map((word, i) => (
            <span
              key={i}
              className={`font-mono-tag text-sm md:text-base tracking-widest intro-role-word ${
                i < visibleWords ? "intro-role-word-visible" : ""
              } ${word.color}`}
            >
              {word.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
