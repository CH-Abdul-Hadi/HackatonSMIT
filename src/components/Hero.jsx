import React from "react";
import Card from "./Card";

const Hero = () => {
  return (
    <section className="px-2 sm:px-4 md:px-6">
      <div className="relative top-26 rounded-xl flex flex-col items-center justify-center min-h-[80vh] w-full max-w-[82rem] mx-auto overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors">
        {/* Decorative Closer Shape */}
        <div
          className="absolute bg-gradient-to-r from-blue-500/20 to-blue-700/30 rounded-[50px] blur-2xl hidden sm:block"
          style={{
            width: "1398px",
            height: "328px",
            top: "136px",
            left: "262px",
            opacity: 1,
            transform: "rotate(0deg)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Discover Your Style
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Shop the latest fashion trends with comfort and confidence.
          </p>
          <button
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
