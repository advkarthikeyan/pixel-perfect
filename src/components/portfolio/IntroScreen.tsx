import { useEffect, useState, useCallback } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

// Storyboard phases (mirrors the 12-frame reference)
//  zoom1 -> zoom2 -> zoom3 (A grows in 3 stages, centered)
//  rotate            (A rotates 90deg CW, still intact -> looks like ◁)
//  separate          (crossbar slides out to the right)
//  slash             (the separated dash rotates ~ -65deg to become /)
//  compose           (the </ shrinks and shifts to the left of the text area)
//  type              (typewriter "Amirda varshini M N" with blinking _)
//  exit              (whole screen fades out)
type Phase =
  | "zoom1"
  | "zoom2"
  | "zoom3"
  | "rotate"
  | "separate"
  | "slash"
  | "compose"
  | "type"
  | "exit";

const SCHEDULE: { phase: Phase; at: number }[] = [
  { phase: "zoom1", at: 0 },
  { phase: "zoom2", at: 350 },
  { phase: "zoom3", at: 750 },
  { phase: "rotate", at: 1400 },
  { phase: "separate", at: 2100 },
  { phase: "slash", at: 2600 },
  { phase: "compose", at: 3100 },
  { phase: "type", at: 3500 },
];

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState<Phase>("zoom1");
  const [typed, setTyped] = useState("");

  const fullName = "Amirda varshini M N";
  const handleComplete = useCallback(onComplete, [onComplete]);

  // Drive phases on a fixed schedule
  useEffect(() => {
    const timers = SCHEDULE.map(({ phase: p, at }) =>
      setTimeout(() => setPhase(p), at),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typewriter
  useEffect(() => {
    if (phase !== "type") return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(fullName.slice(0, i));
      if (i >= fullName.length) clearInterval(id);
    }, 95);
    return () => clearInterval(id);
  }, [phase]);

  // Exit / complete
  useEffect(() => {
    const typeStart = SCHEDULE[SCHEDULE.length - 1].at;
    const total = typeStart + fullName.length * 95 + 1800;
    const exitT = setTimeout(() => setPhase("exit"), total);
    const doneT = setTimeout(handleComplete, total + 700);
    return () => {
      clearTimeout(exitT);
      clearTimeout(doneT);
    };
  }, [handleComplete]);

  const reachedRotate =
    phase === "rotate" ||
    phase === "separate" ||
    phase === "slash" ||
    phase === "compose" ||
    phase === "type" ||
    phase === "exit";

  const reachedSeparate =
    phase === "separate" ||
    phase === "slash" ||
    phase === "compose" ||
    phase === "type" ||
    phase === "exit";

  const reachedSlash =
    phase === "slash" ||
    phase === "compose" ||
    phase === "type" ||
    phase === "exit";

  const composed =
    phase === "compose" || phase === "type" || phase === "exit";

  // Outer wrapper scale during the 3-stage zoom-in.
  // After "rotate" it stays at scale 1 until "compose" shrinks it for the typed line.
  const outerScale =
    phase === "zoom1"
      ? 0.35
      : phase === "zoom2"
        ? 0.65
        : composed
          ? 0.45
          : 1;

  // Horizontal shift: A is centered until composed -> moves left next to the text
  const outerTranslateX = composed ? "-180px" : "0px";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black ${
        phase === "exit" ? "intro-exit" : ""
      }`}
      style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
    >
      {/* Stage container */}
      <div className="relative flex items-center justify-center w-full">
        {/* Outer wrapper: handles zoom stages + final slide-left into composition */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${outerTranslateX}), -50%) scale(${outerScale})`,
            transition:
              "transform 600ms cubic-bezier(.7,0,.2,1)",
            willChange: "transform",
          }}
        >
          {/* Inner wrapper: handles the 90deg CW rotation -> "<" */}
          <div
            style={{
              position: "relative",
              width: "180px",
              height: "180px",
              transform: reachedRotate ? "rotate(90deg)" : "rotate(0deg)",
              transformOrigin: "center",
              transition: "transform 700ms cubic-bezier(.7,0,.2,1)",
            }}
          >
            {/* Left leg of A */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: "12px",
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
                width: "12px",
                height: "100%",
                background: "white",
                transform: "translateX(-50%) rotate(20deg)",
                transformOrigin: "bottom center",
                borderRadius: "2px",
              }}
            />
            {/* Crossbar -> slash.
                - Stays in place during rotate
                - Slides to the right during separate
                - Rotates ~ -65deg during slash (after parent's +90deg, reads as "/") */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "62%",
                width: "78px",
                height: "12px",
                background: "white",
                borderRadius: "2px",
                transform: reachedSlash
                  ? "translate(120%, 30%) rotate(-65deg)"
                  : reachedSeparate
                    ? "translate(120%, -50%) rotate(0deg)"
                    : "translate(-50%, -50%) rotate(0deg)",
                transformOrigin: "center",
                transition: "transform 600ms cubic-bezier(.7,0,.2,1)",
              }}
            />
          </div>
        </div>

        {/* Typed line — appears once composed.
            Sits to the right of the </ symbol. */}
        <div
          style={{
            opacity: composed ? 1 : 0,
            transition: "opacity 350ms ease 200ms",
            transform: "translateX(40px)",
          }}
          className="text-white text-2xl md:text-4xl lg:text-5xl tracking-tight whitespace-nowrap"
        >
          {typed}
          <span className="animate-blink text-white">_</span>
        </div>
      </div>
    </div>
  );
};
