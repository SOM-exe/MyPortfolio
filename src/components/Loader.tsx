import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const words = ["Design", "Code", "Innovate"];

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const duration = 2700; // 2700ms total
    let startTime: number | null = null;
    let animationFrameId: number;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      // Cycle words: 3 words over 2700ms means a word every 900ms
      const currentWordIndex = Math.min(
        words.length - 1,
        Math.floor(elapsed / 900)
      );
      setWordIndex(currentWordIndex);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        // Complete state
        setCount(100);
        setWordIndex(words.length - 1);
        
        // 400ms delay after count reaches 100, then triggers onComplete
        const timer = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timer);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="loader-overlay"
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-16 select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Top Left Label */}
      <div className="overflow-hidden">
        <motion.div
          id="loader-label"
          className="text-xs text-muted font-body uppercase tracking-[0.3em] font-medium"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Portfolio
        </motion.div>
      </div>

      {/* Center Word Rotator */}
      <div className="flex flex-col items-center justify-center flex-1 h-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            id={`loader-word-${wordIndex}`}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 selection:bg-transparent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Section: Counter and Progress */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-baseline justify-end">
          {/* Bottom Right Counter */}
          <motion.div
            id="loader-counter"
            className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary leading-none tracking-tight tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {String(count).padStart(3, "0")}
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <motion.div
            id="loader-progress-inner"
            className="absolute top-0 left-0 h-full accent-gradient rounded-full"
            style={{ 
              width: `${count}%`,
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)"
            }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
