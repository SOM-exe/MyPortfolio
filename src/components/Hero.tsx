import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  isLoaded: boolean;
}

const roles = [
  "DSA in JAVA -Coder",
  "Fullstack Developer",
  "IoT Developer",
  "UI Designer"
];

export default function Hero({ isLoaded }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Source stream url
  const hlsSource = "https://test-streams.mux.dev/x36xhgc/x36xhgc.m3u8";

  // Cycle through roles every 2 seconds
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(roleTimer);
  }, []);

  // Initialize HLS.js streaming
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(hlsSource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsSource;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance triggers on isLoaded = true
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Name Reveal
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      // Blur in eyebrow, role, description and CTA buttons
      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { 
          opacity: 1, 
          filter: "blur(0px)", 
          y: 0, 
          duration: 1.0, 
          stagger: 0.15 
        },
        "-=0.8" // overlaps with above
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const handleScrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg select-none"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          id="hero-background-video"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-screen"
          muted
          loop
          playsInline
          autoPlay
        />
        {/* Dark overlay for rich contrast and legibility */}
        <div className="absolute inset-0 bg-black/55 z-0" />
        
        {/* Bottom backdrop fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-3 font-semibold select-none">
          COLLECTION '26
        </p>

        {/* Name Title */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-3 select-none">
          Shobhit Sharma
        </h1>

        {/* Role Cycler */}
        <div className="blur-in h-6 md:h-8 mb-3 flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="text-sm md:text-lg font-mono text-center flex items-center gap-1 font-semibold"
            >
              <span className="text-muted">A</span>{" "}
              <span className="gradient-text">{roles[roleIndex]}</span>{" "}
              <span className="text-muted">lives in Bhopal.</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Paragraph Description */}
        <div className="blur-in text-xs md:text-sm text-muted max-w-xl mb-6 font-light leading-snug flex flex-col gap-2 text-center">
          <p className="font-semibold text-[#89AACC]">
            B.Tech CSE (IoT) @ LNCT Bhopal <span className="text-stroke mx-1">|</span> SIH 2025 Runner-Up
          </p>
          <p>
            I blend hardware and software to build seamless, real-world digital experiences. With a strong foundation in Java DSA and hands-on experience in modern web stacks and IoT hardware, I am dedicated to crafting innovative solutions from the ground up.
          </p>
          <p>
            Currently focused on strengthening problem-solving skills and building full-stack applications. Learning, building, and growing every day.
          </p>
        </div>

        {/* Action Controls */}
        <div className="blur-in flex flex-wrap gap-4 items-center justify-center">
          <button
            onClick={handleScrollToWork}
            className="rounded-full text-xs md:text-sm font-semibold px-7 py-3.5 bg-text-primary text-bg hover:scale-105 transition-all cursor-pointer select-none"
          >
            See Works
          </button>
          <a
            href="/SOMS_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full text-xs md:text-sm font-medium px-7 py-3.5 border border-white/20 text-text-primary hover:border-white/50 hover:bg-white/5 hover:scale-105 transition-all select-none"
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Decorative Slide Indicator */}
      <div 
        onClick={handleScrollToWork}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted uppercase tracking-[0.2em] font-mono text-[9px] font-medium cursor-pointer"
      >
        <span>Scroll</span>
        <div className="w-[1px] h-10 bg-stroke/50 relative overflow-hidden flex justify-center">
          <div className="absolute top-0 w-[2px] h-[10px] accent-gradient animate-scroll-down rounded-full shadow-[0_0_8px_rgba(137,170,204,0.35)]" />
        </div>
      </div>
    </section>
  );
}
