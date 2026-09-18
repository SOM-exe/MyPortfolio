import { motion } from "framer-motion";
import { Cpu, Terminal, FileCheck } from "lucide-react";
import { StatMetric } from "../types";

const statsData: StatMetric[] = [
  {
    id: "stat-projects",
    label: "Projects Completed",
    value: "14",
    description: "Multi-tiered fullstack web systems and custom IoT hardware devices built end-to-end.",
    icon: "filecheck"
  },
  {
    id: "stat-tech",
    label: "Expert Technologies",
    value: "08",
    description: "Deep competence across Java Core, C++ firmware, React systems, and UI vector design.",
    icon: "cpu"
  },
  {
    id: "stat-hours",
    label: "Hours Coded",
    value: "1,850",
    description: "Dedicated to database normalization, IMU kinematics tuning, and competitive algorithm puzzles.",
    icon: "terminal"
  }
];

export default function Stats() {
  return (
    <section 
      id="stats" 
      className="bg-bg py-20 md:py-28 text-text-primary px-6 border-t border-stroke relative"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Metric Grid wrapper */}
        <div 
          id="stats-grid-row"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {statsData.map((stat, index) => {
            return (
              <motion.div
                key={stat.id}
                id={`stat-card-${stat.id}`}
                className="group relative bg-surface border border-stroke rounded-[24px] p-8 md:p-10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              >
                {/* Visual Accent ring on card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#89AACC]/10 to-[#4E85BF]/5 rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Card Icon & label */}
                <div>
                  <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center bg-bg/40 text-muted group-hover:text-white transition-colors mb-6 shadow-sm">
                    {stat.icon === "filecheck" && <FileCheck size={18} />}
                    {stat.icon === "cpu" && <Cpu size={18} />}
                    {stat.icon === "terminal" && <Terminal size={18} />}
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted block mb-2 select-none">
                    {stat.label}
                  </span>
                </div>

                {/* Large Display Value */}
                <div className="my-4">
                  <h3 className="text-6xl md:text-7xl font-display text-text-primary group-hover:text-white transition-colors tabular-nums tracking-tight leading-none">
                    {stat.value}
                    <span className="text-[#89AACC] font-light font-mono text-3xl sm:text-4xl ml-1 group-hover:scale-110 inline-block transition-transform">
                      +
                    </span>
                  </h3>
                </div>

                {/* Footnotes */}
                <p className="text-xs md:text-sm text-muted font-light leading-relaxed mt-4 border-t border-stroke/40 pt-4">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
