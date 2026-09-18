import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { JournalEntry } from "../types";

const journalData: JournalEntry[] = [
  {
    id: "kalman-filtering",
    title: "Optimizing Kalman Filtering for Embedded Kinematic IoT Devices",
    category: "Hardware & IoT",
    readTime: "5 min read",
    date: "18 May 2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop",
    summary: "Resolving sensory noise matrices in hardware telemetry. Examining acceleration vectors, microsecond polling, and spatial algorithms."
  },
  {
    id: "react19-concurrency",
    title: "The Architecture of Concurrent Rendering States in React 19",
    category: "Fullstack Architecture",
    readTime: "7 min read",
    date: "29 Apr 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=300&auto=format&fit=crop",
    summary: "How background transitions, compiler-optimized rendering pipelines, and modern hooks transform UI responsiveness."
  },
  {
    id: "jvm-concurrency",
    title: "Optimizing Low-Latency Thread Synchronization inside JVM Core",
    category: "Backend Engine",
    readTime: "8 min read",
    date: "12 Mar 2026",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=300&auto=format&fit=crop",
    summary: "Deep dive into virtual thread execution models, memory barriers, and tuning GC profiles to maintain 3ms response loops."
  },
  {
    id: "dark-ui-psychology",
    title: "The Subtle Art of Dark Interface Contrast and Visual Tension",
    category: "UI Design & Craft",
    readTime: "4 min read",
    date: "05 Jan 2026",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=300&auto=format&fit=crop",
    summary: "Balancing color contrast levels, ambient typography, and fluid animation rhythms to capture user focus inside night designs."
  }
];

export default function Journal() {
  return (
    <section 
      id="journal" 
      className="bg-bg py-20 md:py-28 text-text-primary px-6 border-t border-stroke"
    >
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header - same animation pattern as works */}
        <motion.div
          id="journal-header"
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-xl">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-muted font-bold block mb-3">
              JOURNAL
            </span>
            <h2 className="text-4xl md:text-5xl font-display italic leading-tight">
              Thoughts on hardware logic, code systems, and visual depth.
            </h2>
          </div>
          <div className="text-muted text-xs md:text-sm font-light font-mono text-left max-w-xs leading-relaxed border-l border-stroke pl-4">
            A digital logbook documenting technical challenges, algorithmic optimization, and UX reflections.
          </div>
        </motion.div>

        {/* Journal Entries List of horizontal capsules */}
        <div 
          id="journal-entries-container"
          className="flex flex-col gap-6"
        >
          {journalData.map((entry, index) => (
            <JournalPill key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JournalPill({ entry, index }: { entry: JournalEntry; index: number; key?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      id={`journal-pill-${entry.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer active:scale-[0.99] transition-all duration-300 w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Container: Horizontal Pill on desktop, rounded box-container on mobile */}
      <div 
        className="w-full bg-surface border border-stroke rounded-[24px] sm:rounded-full p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 hover:border-white/20 hover:bg-surface/90 transition-all duration-500 overflow-hidden"
      >
        {/* Left container: Image and General Text titles */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
          {/* Circular Thumbnail that scales out on hover */}
          <div className="relative w-full sm:w-16 h-36 sm:h-16 rounded-[16px] sm:rounded-full overflow-hidden bg-bg border border-stroke shrink-0">
            <img 
              src={entry.image} 
              alt={entry.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Subtle mask overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="text-left w-full sm:w-auto select-none">
            {/* Category and Date row */}
            <div className="flex items-center gap-3 mb-1.5 font-mono text-[10px]">
              <span className="text-muted-foreground gradient-text font-bold">
                {entry.category}
              </span>
              <span className="text-stroke">•</span>
              <span className="text-muted">
                {entry.date}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base md:text-lg font-display italic text-text-primary group-hover:text-white transition-colors leading-snug">
              {entry.title}
            </h3>

            {/* Expandable summary on desktop, visible short block on mobile */}
            <p className="text-[12px] text-muted font-light mt-1 max-w-xl line-clamp-1 group-hover:line-clamp-2 sm:group-hover:text-white/80 transition-all duration-300">
              {entry.summary}
            </p>
          </div>
        </div>

        {/* Right Info: Read Time & Action Label */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto border-t sm:border-t-0 border-stroke/40 pt-3 sm:pt-0 font-mono text-xs shrink-0 select-none">
          {/* Read counter */}
          <div className="flex items-center gap-1.5 text-muted group-hover:text-white/90 transition-colors text-[11px]">
            <BookOpen size={12} className="text-muted/70 group-hover:text-[#89AACC] transition-colors" />
            <span>{entry.readTime}</span>
          </div>
          
          <span className="text-[10px] uppercase text-[#89AACC] font-bold tracking-wider hidden sm:inline-block mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            Read Thread ↗
          </span>
        </div>
      </div>
    </motion.div>
  );
}
