import React, { useEffect, useState, useCallback } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

type Phase =
  | "zoom1" | "zoom2" | "zoom3" | "rotate"
  | "separate" | "slash" | "compose" | "type" | "exit";

// FASTER SCHEDULE: Reduced the at: values to make the page load action happen sooner
const SCHEDULE: { phase: Phase; at: number }[] = [
  { phase: "zoom1", at: 0 },
  { phase: "zoom2", at: 200 }, // Faster entry
  { phase: "zoom3", at: 500 }, // Full size sooner
  { phase: "rotate", at: 1100 },
  { phase: "separate", at: 1700 },
  { phase: "slash", at: 2100 },
  { phase: "compose", at: 2500 },
  { phase: "type", at: 2900 },
];

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState<Phase>("zoom1");
  const [typed, setTyped] = useState("");

  const fullName = "Amirda Varshini M N>";
  const handleComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    const timers = SCHEDULE.map(({ phase: p, at }) =>
      setTimeout(() => setPhase(p), at)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "type") return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(fullName.slice(0, i));
      if (i >= fullName.length) clearInterval(id);
    }, 70); // Slightly faster typing for better UX
    return () => clearInterval(id);
  }, [phase, fullName]);

  useEffect(() => {
    const typeStart = SCHEDULE[SCHEDULE.length - 1].at;
    const total = typeStart + fullName.length * 70 + 1200;
    const exitT = setTimeout(() => setPhase("exit"), total);
    const doneT = setTimeout(handleComplete, total + 500);
    return () => {
      clearTimeout(exitT);
      clearTimeout(doneT);
    };
  }, [handleComplete, fullName.length]);

  const reachedRotate = ["rotate", "separate", "slash", "compose", "type", "exit"].includes(phase);
  const reachedSeparate = ["separate", "slash", "compose", "type", "exit"].includes(phase);
  const reachedSlash = ["slash", "compose", "type", "exit"].includes(phase);
  const composed = ["compose", "type", "exit"].includes(phase);

  const outerScale =
    phase === "zoom1" ? 0 : 
    phase === "zoom2" ? 0.6 : // Starting at 0.6 feels more energetic
    phase === "zoom3" ? 1 :
    composed ? 0.45 : 1;

  const outerOpacity = phase === "zoom1" ? 0 : 1;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex items-center justify-center">
        
        {/* LOGO BOX */}
        <div
          style={{
            transform: `scale(${outerScale})`,
            opacity: outerOpacity,
            // PREMIUM SMOOTH ZOOM: Use cubic-bezier(0.34, 1.56, 0.64, 1) for a subtle "spring" effect
            transition: "transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 400ms ease-out",
            width: "180px",
            height: "180px",
            marginRight: composed ? "-50px" : "0px", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "180px",
              height: "180px",
              transform: reachedRotate ? "rotate(90deg)" : "rotate(180deg)",
              transformOrigin: "center",
              transition: "transform 900ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            {/* Left leg of A */}
            <div style={{
              position: "absolute", left: "50%", top: 0, width: "12px", height: "100%",
              background: "rgb(203, 213, 225)", borderRadius: "2px",
              transform: "translateX(-50%) rotate(-20deg)", transformOrigin: "bottom center"
            }} />
            
            {/* Right leg of A */}
            <div style={{
              position: "absolute", left: "50%", top: 0, width: "12px", height: "100%",
              background: "rgb(203, 213, 225)", borderRadius: "2px",
              transform: "translateX(-50%) rotate(20deg)", transformOrigin: "bottom center"
            }} />
            
            {/* CROSSBAR -> SLASH */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "62%",
                width: "118px",
                height: "12px",
                background: "rgb(203, 213, 225)",
                borderRadius: "2px",
                transform: reachedSlash
                  ? "translate(-50%, -1200%) rotate(15deg)" 
                  : reachedSeparate
                    ? "translate(120%, -250%) rotate(0deg)"
                    : "translate(-50%, -250%) rotate(0deg)",
                transformOrigin: "center",
                transition: "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
        </div>

        {/* TEXT AREA */}
        <div
          style={{
            width: composed ? "auto" : "0px",
            opacity: composed ? 1 : 0,
            overflow: "hidden",
            marginLeft: composed ? "20px" : "-20px", 
            transition: "all 600ms cubic-bezier(0.23, 1, 0.32, 1)",
            display: "flex",
            alignItems: "center"
          }}
          className="text-slate-300 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight whitespace-nowrap"
        >
          {typed}
          <span className="animate-pulse ml-1">_</span>
        </div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        .animate-pulse { animation: blink 1s step-end infinite; }
      `}</style>
    </div>
  );
};