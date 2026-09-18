import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CodingSkills from "./components/CodingSkills";
import Works from "./components/Works";
import Journal from "./components/Journal";
import Explorations from "./components/Explorations";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-bg text-text-primary selection:bg-white/10 selection:text-white overflow-x-hidden">
      {/* Interactive Video Grain Layer */}
      <div className="video-grain"></div>

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Landing Page Content Grid */}
      <div className={`transition-all duration-700 ${isLoading ? "blur-md pointer-events-none scale-[0.98]" : "blur-0 scale-100"}`}>
        <Hero isLoaded={!isLoading} />
        <CodingSkills />
        <Works />
        <Journal />
        <Explorations />
        <Stats />
        <Footer />
      </div>

      {/* Master Loading screen overlay with requestAnimationFrame updates */}
      <AnimatePresence>
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

