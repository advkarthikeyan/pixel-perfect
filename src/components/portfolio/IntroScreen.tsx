import React, { useEffect, useState, useCallback } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

type Phase =
  | "zoom1" | "zoom2" | "zoom3" | "rotate"
  | "separate" | "slash" | "compose" | "type" 
  | "slogan1" | "slogan2" | "slogan3" | "exit";

const PRIMARY_COLOR = "#FFFFFF";
const ACCENT_COLOR = "#bd27d1";

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState<Phase>("zoom1");
  const [typed, setTyped] = useState("");
  const [showMirror, setShowMirror] = useState(false);

  const fullName = "Amirda Varshini M N";
  const handleComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    const schedule: { p: Phase; at: number }[] = [
      { p: "zoom1", at: 0 },
      { p: "zoom2", at: 200 },
      { p: "zoom3", at: 500 },
      { p: "rotate", at: 1100 },
      { p: "separate", at: 1700 },
      { p: "slash", at: 2100 },
      { p: "compose", at: 2500 },
      { p: "type", at: 2900 },
    ];

    const timers = schedule.map(({ p, at }) =>
      setTimeout(() => setPhase(p), at)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "type") return;
    let i = 0;
    const typingInterval = setInterval(() => {
      i += 1;
      setTyped(fullName.slice(0, i));
      if (i >= fullName.length) {
        clearInterval(typingInterval);
        
        setTimeout(() => setShowMirror(true), 200);  
        setTimeout(() => setPhase("slogan1"), 800);    
        setTimeout(() => setPhase("slogan2"), 1300);   
        setTimeout(() => setPhase("slogan3"), 1800);   
        setTimeout(() => setPhase("exit"), 3800);      
        setTimeout(handleComplete, 4800);              
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, [phase, fullName, handleComplete]);

  const reachedRotate = ["rotate", "separate", "slash", "compose", "type", "slogan1", "slogan2", "slogan3", "exit"].includes(phase);
  const reachedSlash = ["slash", "compose", "type", "slogan1", "slogan2", "slogan3", "exit"].includes(phase);
  const composed = ["compose", "type", "slogan1", "slogan2", "slogan3", "exit"].includes(phase);
  
  const outerScale =
    phase === "zoom1" ? 0 :
    phase === "zoom2" ? 0.6 :
    phase === "zoom3" ? 1 :
    reachedRotate && !composed ? 0.7 :
    composed ? 0.45 : 1;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-transform duration-1000 ease-[cubic-bezier(0.82,0,0.18,1)] ${
        phase === "exit" ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          
          {/* LEFT LOGO BOX */}
          <div
            style={{
              transform: `scale(${outerScale})`,
              opacity: phase === "zoom1" ? 0 : 1,
              transition: "transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 400ms ease-out",
              width: "180px",
              height: "180px",
              marginRight: composed ? "-60px" : "0px",
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
              <div style={{ position: "absolute", left: "50%", top: 0, width: "12px", height: "100%", background: PRIMARY_COLOR, borderRadius: "2px", transform: "translateX(-50%) rotate(-20deg)", transformOrigin: "bottom center" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, width: "12px", height: "100%", background: PRIMARY_COLOR, borderRadius: "2px", transform: "translateX(-50%) rotate(20deg)", transformOrigin: "bottom center" }} />
              
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "62%",
                  width: "118px",
                  height: "12px",
                  background: ACCENT_COLOR,
                  borderRadius: "2px",
                  transform: reachedSlash
                    ? "translate(-50%, -1200%) rotate(15deg)"
                    : phase === "separate"
                    ? "translate(-50%, -250%) rotate(0deg)"
                    : "translate(-50%, -250%) rotate(0deg)",
                  transformOrigin: "center",
                  transition: "transform 800ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
          </div>

          {/* NAME AREA */}
          <div
            style={{
              width: composed ? "auto" : "0",
              opacity: composed ? 1 : 0,
              overflow: "hidden",
              marginLeft: `${composed ? 30 : -20}px`,
              transition: "all 600ms cubic-bezier(0.23, 1, 0.32, 1)",
              display: "flex",
              alignItems: "center",
            }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight whitespace-nowrap"
          >
            {typed.split("").map((char, idx) => (
              <span key={idx} style={{ color: PRIMARY_COLOR, whiteSpace: "pre" }}>{char}</span>
            ))}
            {!showMirror && <span className="animate-pulse ml-1 text-white">_</span>}
          </div>

          {/* RIGHT MIRROR LOGO */}
          <div
            style={{
              transform: "scale(0.45)",
              opacity: showMirror ? 1 : 0,
              marginLeft: "-60px",
              transition: "opacity 500ms ease-out",
              width: "180px",
              height: "180px",
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
                transform: "rotate(-90deg)",
                transformOrigin: "center",
              }}
            >
              <div style={{ position: "absolute", left: "50%", top: 0, width: "12px", height: "100%", background: PRIMARY_COLOR, borderRadius: "2px", transform: "translateX(-50%) rotate(-20deg)", transformOrigin: "bottom center" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, width: "12px", height: "100%", background: PRIMARY_COLOR, borderRadius: "2px", transform: "translateX(-50%) rotate(20deg)", transformOrigin: "bottom center" }} />
            </div>
          </div>
        </div>

        {/* SLOGAN AREA */}
        <div className="mt-12 flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <div
            className={`text-lg md:text-xl font-medium transition-all duration-700 ${
              ["slogan1", "slogan2", "slogan3", "exit"].includes(phase) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: PRIMARY_COLOR }}
          >
            I Build.
          </div>

          <div
            className={`text-lg md:text-xl font-medium transition-all duration-700 delay-100 ${
              ["slogan2", "slogan3", "exit"].includes(phase) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: ACCENT_COLOR }}
          >
            I Scale.
          </div>

          <div
            className={`text-lg md:text-xl font-bold transition-all duration-700 delay-200 ${
              ["slogan3", "exit"].includes(phase) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              background: `linear-gradient(to right, ${PRIMARY_COLOR}, ${ACCENT_COLOR})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            I Ship Software.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        .animate-pulse { animation: blink 1s step-end infinite; }
      `}</style>
    </div>
  );
};