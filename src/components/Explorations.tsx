import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const explorationsLeft: ExplorationItem[] = [
  {
    id: "exp-1",
    title: "Smart India Hackathon '25",
    category: "Event Participation",
    image: "/images/sih-badge.jpg"
  },
  {
    id: "exp-2",
    title: "Smart Air Purifier Build",
    category: "Prototype Design",
    image: "/images/ecobreathe-prototype.jpg"
  },
  {
    id: "exp-3",
    title: "The Team Behind Delhi Breath",
    category: "Hackathon Crew",
    image: "/images/team-hoodies.jpg"
  }
];

const explorationsRight: ExplorationItem[] = [
  {
    id: "exp-4",
    title: "LNCT X MIT ADT",
    category: "SIH 2025 Finals",
    image: "/images/sih-team.jpg"
  },
  {
    id: "exp-5",
    title: "Stage Felicitation",
    category: "SIH Hardware Edition",
    image: "/images/sih-valedictory.jpg"
  },
  {
    id: "exp-6",
    title: "Waiting for Results",
    category: "SIH 2025",
    image: "/images/team-selfie.jpg"
  }
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const text = textRef.current;

    if (!container || !leftCol || !rightCol || !text) return;

    const ctx = gsap.context(() => {
      // Trigger smooth scrolling scrollbar linkage for left column - moves up
      gsap.fromTo(
        leftCol,
        { y: "15%" },
        {
          y: "-35%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // Trigger standard linkage for right column - moves down
      gsap.fromTo(
        rightCol,
        { y: "-35%" },
        {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // Scale central content overlay subtly with scrolling
      gsap.fromTo(
        text,
        { scale: 0.9, opacity: 0.2, filter: "blur(4px)" },
        {
          scale: 1.15,
          opacity: 0.95,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="explorations-parallax-section"
      ref={containerRef}
      className="relative min-h-[180vh] sm:min-h-[250vh] md:min-h-[300vh] bg-bg w-full z-30"
    >
      {/* Sticky viewport frame to anchor visual layout (Layer 1) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-bg flex-col pointer-events-none z-10">
        
        {/* Decorative Grid Lines to represent system design lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

        {/* Pinned center Text panel (Layer 1 Content) */}
        <div 
          ref={textRef}
          className="text-center px-4 max-w-2xl z-20"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted font-bold block mb-4">
            VISUAL DISCOVERY
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display italic leading-narrow text-text-primary mb-4 select-none">
            Explorations
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted max-w-sm mx-auto font-light leading-relaxed select-none">
            A micro-gallery documenting material studies, interface concepts, and geometric layouts.
          </p>
        </div>
      </div>

      {/* Parallax columns grid (Layer 2) */}
      <div 
        id="parallax-columns-container"
        className="absolute inset-0 w-full pointer-events-auto z-20 flex justify-center px-6 md:px-16"
      >
        <div className="grid grid-cols-2 gap-6 sm:gap-12 md:gap-24 lg:gap-36 w-full max-w-[1240px] pt-[25vh] pb-[25vh]">
          
          {/* Left Parallax Column */}
          <div 
            ref={leftColRef}
            className="flex flex-col gap-12 sm:gap-24 md:gap-36 pt-[10vh]"
          >
            {explorationsLeft.map((item) => (
              <ParallaxCard key={item.id} item={item} />
            ))}
          </div>

          {/* Right Parallax Column */}
          <div 
            ref={rightColRef}
            className="flex flex-col gap-12 sm:gap-24 md:gap-36"
          >
            {explorationsRight.map((item) => (
              <ParallaxCard key={item.id} item={item} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function ParallaxCard({ item }: { item: ExplorationItem; key?: string }) {
  return (
    <div 
      id={`parallax-card-${item.id}`}
      className="group relative bg-surface border border-stroke rounded-[20px] sm:rounded-[32px] overflow-hidden p-3 md:p-4 hover:border-white/10 transition-colors duration-300 w-full shadow-lg shadow-black/45 hover:shadow-black/60"
    >
      {/* Image frame */}
      <div className="relative aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden bg-bg border border-stroke">
        <img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale opacity-75 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none"
        />
        {/* Glow tint mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-60" />
      </div>

      {/* Text detail metadata card */}
      <div className="pt-4 px-2 select-none">
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#89AACC] font-bold">
          {item.category}
        </span>
        <h4 className="text-sm md:text-base font-display italic text-text-primary group-hover:text-white transition-colors mt-0.5 pointer-events-none leading-snug">
          {item.title}
        </h4>
      </div>
    </div>
  );
}
