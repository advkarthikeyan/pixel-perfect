import { useEffect, useState, useCallback } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

type Phase = "zoom" | "transform" | "type" | "exit";

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState<Phase>("zoom");
  const [typed, setTyped] = useState("");

  const fullName = "Amirda Varshini M N";
  const handleComplete = useCallback(onComplete, [onComplete]);

  // Phase scheduling: zoom -> transform -> type -> exit
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("transform"), 1300);
    const t2 = setTimeout(() => setPhase("type"), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Typewriter
  useEffect(() => {
    if (phase !== "type") return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(fullName.slice(0, i));
      if (i >= fullName.length) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, [phase]);

  // Exit / complete
  useEffect(() => {
    const total = 2300 + fullName.length * 90 + 2200;
    const exitT = setTimeout(() => setPhase("exit"), total);
    const doneT = setTimeout(handleComplete, total + 800);
    return () => {
      clearTimeout(exitT);
      clearTimeout(doneT);
    };
  }, [handleComplete]);

  const morphed = phase === "transform" || phase === "type" || phase === "exit";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black ${
        phase === "exit" ? "intro-exit" : ""
      }`}
      style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
    >
      <div className="flex items-center gap-4">
        {/* Outer wrapper handles the initial zoom-in */}
        <div
          style={{
            animation: "introZoom 1.2s cubic-bezier(.2,.9,.3,1.15) both",
            display: "inline-block",
          }}
        >
          {/* Inner wrapper handles the 90deg clockwise rotation -> "<" */}
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "120px",
              transform: morphed
                ? "rotate(90deg) scale(0.55)"
                : "rotate(0deg) scale(1)",
              transformOrigin: "center",
              transition:
                "transform 900ms cubic-bezier(.7,0,.2,1)",
            }}
          >
            {/* Left leg of A */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: "10px",
                height: "100%",
                background: "white",
                transform: "translateX(-50%) rotate(-20deg)",
                transformOrigin: "bottom center",
                borderRadius: "2px",
              }}
            />
            {/* Right leg of A */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: "10px",
                height: "100%",
                background: "white",
                transform: "translateX(-50%) rotate(20deg)",
                transformOrigin: "bottom center",
                borderRadius: "2px",
              }}
            />
            {/* Crossbar -> slash. Separates out and rotates ~ -65deg
                so that, after the parent's +90deg rotation, it appears as "/". */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "62%",
                width: "62px",
                height: "10px",
                background: "white",
                borderRadius: "2px",
                transform: morphed
                  ? "translate(60%, 30%) rotate(-65deg)"
                  : "translate(-50%, -50%) rotate(0deg)",
                transformOrigin: "center",
                transition: "transform 900ms cubic-bezier(.7,0,.2,1)",
              }}
            />
          </div>
        </div>

        {/* Typed name */}
        <div
          className="text-white text-2xl md:text-4xl lg:text-5xl tracking-tight whitespace-nowrap"
          style={{
            minHeight: "1.2em",
            opacity: phase === "type" || phase === "exit" ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        >
          {typed}
          {typed.length === fullName.length && <span>{">"}</span>}
          {phase === "type" && (
            <span className="animate-blink text-white">_</span>
          )}
        </div>
      </div>

      {/* Tagline — default/static */}
      <div className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm md:text-base tracking-widest uppercase">
        <span className="text-white">I build.</span>
        <span className="text-accent">I scale.</span>
        <span className="text-gradient">I ship software.</span>
      </div>

      <style>{`
        @keyframes introZoom {
          0%   { transform: scale(0) translateZ(-2000px); opacity: 0; filter: blur(24px); }
          70%  { transform: scale(1.15); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
      `}</style>
    </div>
  );
};
