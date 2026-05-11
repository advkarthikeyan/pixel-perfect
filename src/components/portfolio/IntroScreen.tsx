import { useEffect, useState, useCallback } from "react";
import { TextPlugin } from "gsap/TextPlugin";

// Register the text plugin for typewriter effect
gsap.registerPlugin(TextPlugin);

const runAnimation = () => {
  const tl = gsap.timeline();

  // 1. Initial State: Zoom A in towards the screen
  tl.fromTo("#logo-svg", 
    { scale: 0, opacity: 0 }, 
    { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }
  );

  // 2. Rotate the entire 'A' 90 degrees to form '<'
  tl.to("#logo-svg", {
    rotation: 90,
    duration: 1,
    ease: "power2.inOut",
    delay: 0.5
  });

  // 3. Move the Crossbar out to the right and rotate it to form '/'
  tl.to("#crossbar", {
    x: 60,           // Move right
    rotation: 20,    // Tilt into a slash
    transformOrigin: "center",
    duration: 0.8,
    ease: "power2.out"
  });

  // 4. Typewriter Animation for the name
  tl.to("#typing-text", {
    duration: 2,
    text: "Amirda varshini M N",
    ease: "none",
    delay: 0.2
  });
};

window.onload = runAnimation;