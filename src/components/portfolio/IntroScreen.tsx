import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register outside to ensure it's ready
gsap.registerPlugin(TextPlugin);

export default function App() {
  // Use specific HTML types for TypeScript
  const svgRef = useRef<SVGSVGElement | null>(null);
  const crossbarRef = useRef<SVGLineElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Safety check: ensure all refs are bound before starting
    if (!svgRef.current || !crossbarRef.current || !textRef.current) return;

    const tl = gsap.timeline();

    // 1. Initial Zoom
    tl.fromTo(svgRef.current, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
    );

    // 2. Rotate 90deg to form '<'
    tl.to(svgRef.current, {
      rotation: 90,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5
    });

    // 3. Separate the dash to form '/'
    tl.to(crossbarRef.current, {
      x: 45,
      rotation: 20,
      transformOrigin: "center",
      duration: 0.7,
      ease: "power2.out"
    });

    // 4. Typewriter effect
    tl.to(textRef.current, {
      duration: 2,
      text: "Amirda varshini M N",
      ease: "none"
    });

    // Cleanup to prevent memory leaks
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <svg 
          ref={svgRef} 
          viewBox="0 0 100 100" 
          style={styles.logo}
        >
          <line x1="50" y1="20" x2="20" y2="80" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="20" x2="80" y2="80" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <line ref={crossbarRef} x1="35" y1="55" x2="65" y2="55" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <div style={styles.textWrapper}>
          <span ref={textRef} style={styles.monoText}></span>
          <span style={styles.cursor}>_</span>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { backgroundColor: 'black', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  wrapper: { display: 'flex', alignItems: 'center', gap: '30px' },
  logo: { width: '150px', height: '150px', overflow: 'visible' },
  textWrapper: { color: 'white', fontSize: '2.5rem', display: 'flex', alignItems: 'center' },
  monoText: { fontFamily: 'monospace' },
  cursor: { fontFamily: 'monospace', fontWeight: 'bold', animation: 'blink 1s infinite step-end' }
};

// Global cursor animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`;
  document.head.appendChild(styleSheet);
}