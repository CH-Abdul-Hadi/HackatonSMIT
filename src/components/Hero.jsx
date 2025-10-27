import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const bgGlowRef = useRef(null);

  useEffect(() => {
    // Debug: Check if refs are attached
    console.log("Button ref:", buttonRef.current);
    console.log("Heading ref:", headingRef.current);
    
    const ctx = gsap.context(() => {
      // Background glow fade-in and subtle pulse
      if (bgGlowRef.current) {
        gsap.fromTo(
          bgGlowRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 2, ease: "power3.out" }
        );

        gsap.to(bgGlowRef.current, {
          scale: 1.05,
          opacity: 0.7,
          repeat: -1,
          yoyo: true,
          duration: 4,
          ease: "sine.inOut",
        });
      }

      // Text + Button animations
      const tl = gsap.timeline({ delay: 0.5 });

      if (headingRef.current) {
        tl.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (textRef.current) {
        tl.from(
          textRef.current,
          { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (buttonRef.current) {
        tl.to(
          buttonRef.current,
          {
            opacity: 1,
            scale: 0.8,
            duration: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.1"
        );
        
        console.log("Button animation added to timeline");
      } else {
        console.error("Button ref is not attached!");
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="px-2 sm:px-4 md:px-6">
      <div className="relative top-26 rounded-xl flex flex-col items-center justify-center min-h-[80vh] w-full max-w-[82rem] mx-auto overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors">

        {/* Glow Background */}
        <div
          ref={bgGlowRef}
          className="absolute bg-gradient-to-r from-blue-500/20 to-blue-700/30 rounded-[50px] blur-2xl hidden sm:block -z-10"
          style={{
            width: "1398px",
            height: "328px",
            top: "136px",
            left: "262px",
            transform: "rotate(0deg)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 sm:px-6 md:px-8">
          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
          >
            Discover Your Style
          </h1>
          <p
            ref={textRef}
            className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
          >
            Shop the latest fashion trends with comfort and confidence.
          </p>
          <button
            ref={buttonRef}
            className="mt-6 px-5 sm:px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
            onClick={() => {
              const section = document.getElementById("products-section");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;