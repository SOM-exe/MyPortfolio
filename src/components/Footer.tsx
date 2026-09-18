import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { Mail, Linkedin, Github, Check, Copy, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const email = "shobhits377@gmail.com";

  // Source stream url
  const hlsSource = "https://test-streams.mux.dev/x36xhgc/x36xhgc.m3u8";

  // Initialize HLS video flipped vertically
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 15,
        enableWorker: true
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

  // GSAP Marquee scroll
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      // Moves the inner row continuously by 50%
      gsap.to(marquee, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });
    });

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="contact" 
      className="relative bg-bg pt-20 pb-10 overflow-hidden px-6 border-t border-stroke"
    >
      {/* Background flipped HLS video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          id="footer-flipped-video"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-25 mix-blend-screen scale-y-[-1]"
          muted
          loop
          playsInline
          autoPlay
        />
        <div className="absolute inset-0 bg-black/65 z-0" />
        
        {/* Top fade gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent z-10" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Large conversational trigger */}
        <div className="text-center mb-16 md:mb-20 max-w-2xl select-none">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#89AACC] font-bold block mb-4">
            LET'S CHAT
          </span>
          <h2 className="text-4xl md:text-6xl font-display italic leading-tight text-text-primary mb-6">
            Let's forge elegant digital logic together.
          </h2>
          <p className="text-sm text-muted font-light max-w-md mx-auto leading-relaxed">
            Reach out for software challenges, embedded layouts, Java optimization, or premium frontend creations.
          </p>
        </div>

        {/* Email Address Capsule */}
        <div 
          id="footer-email-container"
          className="inline-flex items-center gap-3 bg-surface border border-stroke rounded-full px-5 py-3 md:px-7 md:py-4 mb-20 group hover:border-[#89AACC]/40 hover:bg-surface/90 transition-all duration-300"
        >
          <Mail size={16} className="text-muted group-hover:text-[#89AACC] transition-colors" />
          <a 
            href={`mailto:${email}`} 
            className="text-sm md:text-base font-mono text-text-primary hover:text-white transition-colors"
          >
            {email}
          </a>
          <div className="h-4 w-[1px] bg-stroke/60 mx-1" />
          <button
            onClick={handleCopyEmail}
            className="text-muted hover:text-white transition-colors flex items-center gap-1 text-xs font-mono outline-none cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400 animate-pulse" />
                <span className="text-green-400 text-[10px]">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="text-[10px] hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* GSAP Marquee Banner */}
        <div 
          id="marquee-wrapper"
          className="w-full relative py-6 md:py-8 border-y border-stroke/50 overflow-hidden mb-16 select-none bg-surface/30 backdrop-blur-sm"
        >
          {/* Inner scrolling band */}
          <div className="flex whitespace-nowrap">
            <div 
              ref={marqueeRef}
              className="flex font-display italic text-3xl sm:text-5xl uppercase tracking-wider text-text-primary/70 shrink-0 gap-4"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="flex items-center gap-4">
                  <span>ENGINEERING THE FUTURE</span>
                  <span className="text-muted/40">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom footer status strip */}
        <div 
          id="footer-bottom-bar"
          className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-stroke/40"
        >
          {/* Left: availability indicator */}
          <div className="flex items-center gap-2.5 select-none font-mono text-xs">
            {/* Pulsing indicator light */}
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-muted font-medium">Available for projects</span>
          </div>

          {/* Center: Signature credits */}
          <div className="text-center font-mono text-[10px] text-muted">
            © {currentYear} Shobhit Sharma. Crafted with elegance.
          </div>

          {/* Right: social connections */}
          <div className="flex items-center gap-4 select-none font-mono">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-[#89AACC] transition-colors flex items-center gap-1"
            >
              <Linkedin size={13} />
              <span>LinkedIn</span>
            </a>
            <span className="text-stroke/50">|</span>
            <a
              href="https://github.com/shobhits377"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-[#89AACC] transition-colors flex items-center gap-1"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
