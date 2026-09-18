import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Trophy } from "lucide-react";
import { Project } from "../types";

const projectsData: Project[] = [
  {
    id: "delhi-breath",
    title: "Delhi Breath Air Purifier",
    category: "IoT & Environmental Systems",
    tags: ["IoT", "Microcontrollers", "Fuzzy Logic", "React Core Analytics"],
    image: "/images/delhi-breath.jpg",
    achievement: "Smart India Hackathon 2025 Runner Up",
    description: "An automated air purification appliance engineered to combat hazardous AQI levels. Monitors PM2.5, PM10, and CO2 in real-time, dynamically adjusting custom dual-stage filtration cycles using local feedback control code.",
    span: "md:col-span-7",
    link: "#",
    github: "https://github.com/shobhits377"
  },
  {
    id: "projectile-tracking",
    title: "Projectile Tracking Device",
    category: "Hardware & Kinematic Math Systems",
    tags: ["C++", "IMU Sensors", "Signal Filtering", "Matplotlib Interface"],
    image: "/images/projectile.jpg",
    description: "A real-time physical projection monitoring system. Calculates spatial velocity, launch trajectory, and absolute coordinates utilizing Kalman filtering and high-speed telemetry streams.",
    span: "md:col-span-5",
    link: "#",
    github: "https://github.com/shobhits377"
  },
  {
    id: "cognifyz-dashboard",
    title: "Cognifyz Dashboard",
    category: "Fullstack Solutions & Analytics Panels",
    tags: ["React 19", "D3.js Data Engine", "Node.js API", "Tailwind Custom Theme"],
    image: "/images/cognifyz.jpg",
    description: "An interactive enterprise analytics platform rendering deep intelligence metrics. Optimizes live transactional streams feed, user profiling, and spatial metrics within a high-density bento control hub.",
    span: "md:col-span-5",
    link: "#",
    github: "https://github.com/shobhits377"
  },
  {
    id: "jpmorgan-simulation",
    title: "JPMorgan Chase Simulation",
    category: "Distributed Finance & Low Latency Trade Routing",
    tags: ["Java Parallel Core", "Python Math", "React UI Wireframe", "Trade Sockets"],
    image: "/images/jpmorgan.jpg",
    description: "A simulated high-frequency order placement pipeline mapping live market flows. Employs advanced transactional queue synchronization mechanisms to log currency and security arbitrage vectors.",
    span: "md:col-span-7",
    link: "#",
    github: "https://github.com/shobhits377"
  }
];

// Reliable fallback imagery for different project themes so the system never fails to render
const fallbackImages: Record<string, string> = {
  "delhi-breath": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
  "projectile-tracking": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "cognifyz-dashboard": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  "jpmorgan-simulation": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
};

export default function Works() {
  return (
    <section 
      id="work" 
      className="bg-bg py-20 md:py-28 text-text-primary px-6 border-t border-stroke"
    >
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header (Framer Motion whileInView with requested options) */}
        <motion.div
          id="works-header"
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-xl">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-muted font-bold block mb-3">
              SELECTED WORKS
            </span>
            <h2 className="text-4xl md:text-5xl font-display italic leading-tight">
              Engineering solutions across hardware limits and cloud codebases.
            </h2>
          </div>
          <div className="text-muted text-xs md:text-sm font-light font-mono text-left max-w-xs leading-relaxed border-l border-stroke pl-4">
            Curated system solutions covering embedded hardware models, reactive applications, and transactional engines.
          </div>
        </motion.div>

        {/* Bento Grid layout */}
        <div 
          id="works-bento-grid"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
        >
          {projectsData.map((project, idx) => (
            <BentoCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ project, index }: { project: Project; index: number; key?: string }) {
  // Graceful fallback image state management
  const [imgSrc, setImgSrc] = useState(project.image);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackImages[project.id] || "https://picsum.photos/seed/portfolio-project/800/600");
    }
  };

  return (
    <motion.div
      id={`works-card-${project.id}`}
      className={`${project.span} group relative bg-surface border border-stroke rounded-[24px] overflow-hidden flex flex-col justify-between p-6 md:p-8 hover:border-white/20 transition-all duration-300`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Top Details */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-2 block font-semibold">
            {project.category}
          </span>
          <h3 className="text-xl md:text-2xl font-display italic text-text-primary group-hover:text-white transition-colors">
            {project.title}
          </h3>
          {project.achievement && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-xs font-semibold rounded-md shadow-[0_0_10px_rgba(255,215,0,0.1)] backdrop-blur-sm">
              <Trophy size={14} className="text-[#FFD700]" />
              {project.achievement}
            </div>
          )}
        </div>

        {/* Dynamic Action Badges */}
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-bg/80 border border-stroke flex items-center justify-center hover:bg-white hover:text-bg transition-all duration-300"
            >
              <Github size={15} />
            </a>
          )}
          <a
            href={project.link}
            className="w-9 h-9 rounded-full bg-bg/80 border border-stroke flex items-center justify-center hover:bg-white hover:text-bg transition-all duration-300"
          >
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* Visual Workspace container with inner scale border */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-bg/50 border border-stroke flex items-center justify-center group-hover:border-white/10 transition-colors duration-300 mb-6">
        <img
          src={imgSrc}
          alt={project.title}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />
        {/* Subtle decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-65 pointer-events-none" />
      </div>

      {/* Bottom Technical Description & Tags */}
      <div>
        <p className="text-xs md:text-sm text-muted font-light leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Micro elements (Tags) */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-bg/80 text-[10px] font-mono text-muted/90 rounded-full border border-stroke select-none"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
