import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
    >
      <motion.div
        id="navbar-pill"
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-3 py-2 transition-all duration-300 ${
          scrolled ? "shadow-md shadow-black/30 border-white/15 bg-surface/90" : ""
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.1, duration: 0.8, ease: "easeOut" }} // waits for loader to fade
      >
        {/* Logo Capsule */}
        <div 
          onClick={() => handleScrollTo("home")}
          className="flex items-center cursor-pointer mr-4"
        >
          {/* 9x9 circle: w-9 h-9 is exactly 36px/36px which fits nicely */}
          <div className="w-9 h-9 rounded-full accent-gradient p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-bg rounded-full flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary select-none mt-[-1px]">
                SS
              </span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1 md:gap-2 mr-3 font-body">
          <button
            onClick={() => handleScrollTo("home")}
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm text-text-primary hover:text-white/70 transition-colors"
          >
            Home
          </button>
          
          <button
            onClick={() => handleScrollTo("coding-skills")}
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm text-text-primary hover:text-white/70 transition-colors"
          >
            Skills
          </button>
          
          <button
            onClick={() => handleScrollTo("work")}
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm text-text-primary hover:text-white/70 transition-colors"
          >
            Work
          </button>

          <a
            href="/SOMS_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm text-text-primary hover:text-white/70 transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Say Hi Button */}
        <button
          onClick={() => handleScrollTo("contact")}
          className="bg-white text-bg px-4 py-1.5 rounded-full text-xs md:text-sm font-medium hover:bg-white/90 hover:scale-105 transition-all outline-none"
        >
          Say hi ↗
        </button>
      </motion.div>
    </nav>
  );
}
