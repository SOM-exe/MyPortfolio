import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { CheckCircle2, ChevronRight, Medal } from "lucide-react";

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
}

export default function CodingSkills() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [calendarData, setCalendarData] = useState<{date: string; count: number}[]>([]);
  const [calendarStats, setCalendarStats] = useState({ submissions: 130, activeDays: 59, streak: 57 });
  const [hoveredDiff, setHoveredDiff] = useState<string | null>(null);
  const [badge, setBadge] = useState({ 
    count: 1, 
    name: "50 Days Badge 2026", 
    icon: "https://assets.leetcode.com/static_assets/others/50_1080_1080.png" 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live data from a reliable Vercel-hosted API instead of Render (to avoid sleep/503 errors)
    fetch('https://leetcode-api-faisalshohag.vercel.app/pr0player')
      .then(res => res.json())
      .then(data => {
        if (data && data.totalSolved !== undefined) {
          setStats(data);
          
          let parsedCalendar: Record<string, number> = {};
          try {
            // The Faisal API provides submissionCalendar as an object, not a string
            parsedCalendar = typeof data.submissionCalendar === 'string' 
              ? JSON.parse(data.submissionCalendar) 
              : data.submissionCalendar;
          } catch(e) {}

          const formattedCalendar = Object.keys(parsedCalendar || {}).map(timestamp => ({
             date: new Date(Number(timestamp) * 1000).toISOString().slice(0, 10),
             count: parsedCalendar[timestamp]
          }));
          setCalendarData(formattedCalendar);

          const timestamps = Object.keys(parsedCalendar || {}).map(Number).sort((a, b) => a - b);
          let totalSubs = 0;
          let maxStreak = 0;
          let currStreak = 0;
          for (let i = 0; i < timestamps.length; i++) {
            totalSubs += parsedCalendar[timestamps[i]];
            if (i === 0) {
              currStreak = 1;
              maxStreak = 1;
            } else {
              const diff = timestamps[i] - timestamps[i - 1];
              // LeetCode stores daily calendar points exactly 86400 seconds apart
              if (diff === 86400) {
                currStreak++;
                maxStreak = Math.max(maxStreak, currStreak);
              } else {
                currStreak = 1;
              }
            }
          }
          if (timestamps.length > 0) {
            setCalendarStats({
              activeDays: timestamps.length,
              submissions: totalSubs,
              streak: maxStreak
            });
          }
        } else {
          throw new Error("Invalid API response");
        }
      })
      .catch(() => {
        // Fallback to static data from screenshot if API is unavailable
        setStats({
          totalSolved: 79,
          totalQuestions: 3957,
          easySolved: 61,
          totalEasy: 949,
          mediumSolved: 18,
          totalMedium: 2066,
          hardSolved: 0,
          totalHard: 942,
        });

        const fallbackCalendarString = "{\"1769299200\": 3, \"1775692800\": 2, \"1775865600\": 1, \"1775952000\": 1, \"1776038400\": 1, \"1776124800\": 2, \"1776211200\": 1, \"1776297600\": 3, \"1776384000\": 1, \"1776470400\": 1, \"1776556800\": 2, \"1776643200\": 2, \"1776729600\": 1, \"1776816000\": 1, \"1776902400\": 1, \"1776988800\": 2, \"1777075200\": 4, \"1777161600\": 2, \"1777248000\": 4, \"1777334400\": 1, \"1777420800\": 2, \"1777507200\": 1, \"1777593600\": 4, \"1777680000\": 2, \"1777766400\": 1, \"1777852800\": 1, \"1777939200\": 2, \"1778025600\": 4, \"1778112000\": 1, \"1778198400\": 1, \"1778284800\": 3, \"1778371200\": 2, \"1778457600\": 1, \"1778544000\": 4, \"1778630400\": 3, \"1778716800\": 5, \"1778803200\": 1, \"1778889600\": 3, \"1778976000\": 2, \"1779062400\": 1, \"1779148800\": 1, \"1779235200\": 1, \"1779321600\": 3, \"1779408000\": 2, \"1779494400\": 3, \"1779580800\": 4, \"1779667200\": 2, \"1779753600\": 12, \"1779840000\": 1, \"1779926400\": 4, \"1780012800\": 2, \"1780099200\": 1, \"1780185600\": 1, \"1780272000\": 2, \"1780358400\": 3, \"1780444800\": 2, \"1780531200\": 2, \"1780617600\": 3, \"1780704000\": 1}";
        const parsedCalendar = JSON.parse(fallbackCalendarString);
        const formattedCalendar = Object.keys(parsedCalendar).map(timestamp => ({
           date: new Date(Number(timestamp) * 1000).toISOString().slice(0, 10),
           count: parsedCalendar[timestamp]
        }));
        setCalendarData(formattedCalendar);
      })
      .finally(() => setLoading(false));

    // Fetch badges separately
    fetch('https://alfa-leetcode-api.onrender.com/pr0player/badges')
      .then(res => res.json())
      .then(data => {
        if (data && data.badges && data.badges.length > 0) {
          const latestBadge = data.badges[data.badges.length - 1];
          setBadge({
            count: data.badgesCount || data.badges.length,
            name: latestBadge.displayName,
            icon: latestBadge.icon.startsWith('http') ? latestBadge.icon : `https://leetcode.com${latestBadge.icon}`
          });
        }
      })
      .catch(() => {});
  }, []);

  const circleRadius = 55;
  const C = 2 * Math.PI * circleRadius;
  
  // Track math for 3-segment gauge chart (260 degrees total arc)
  const totalTrackLength = C * (260 / 360);
  const trackGap = 8;
  const netTrackLength = totalTrackLength - 2 * trackGap;

  const totalQ = stats ? stats.totalQuestions : 3957;
  const easyTotal = stats ? stats.totalEasy : 949;
  const medTotal = stats ? stats.totalMedium : 2066;
  const hardTotal = stats ? stats.totalHard : 942;

  const easyLen = (easyTotal / totalQ) * netTrackLength;
  const medLen = (medTotal / totalQ) * netTrackLength;
  const hardLen = (hardTotal / totalQ) * netTrackLength;

  const easyOffset = 0;
  const medOffset = easyLen + trackGap;
  const hardOffset = easyLen + trackGap + medLen + trackGap;

  const easySolvedLen = stats && easyTotal > 0 ? (stats.easySolved / easyTotal) * easyLen : 0;
  const medSolvedLen = stats && medTotal > 0 ? (stats.mediumSolved / medTotal) * medLen : 0;
  const hardSolvedLen = stats && hardTotal > 0 ? (stats.hardSolved / hardTotal) * hardLen : 0;

  // Static beats since API doesn't provide them natively
  const beats = { easy: "82.4%", medium: "65.2%", hard: "--" };

  return (
    <section id="coding-skills" className="bg-bg py-24 md:py-32 px-4 border-t border-stroke relative">
      {/* CSS Overrides for Heatmap to match Dark Theme */}
      <style dangerouslySetInnerHTML={{__html: `
        .react-calendar-heatmap .color-empty { fill: #2c2c2c; }
        .react-calendar-heatmap .color-leetcode-1 { fill: #0e4429; }
        .react-calendar-heatmap .color-leetcode-2 { fill: #006d32; }
        .react-calendar-heatmap .color-leetcode-3 { fill: #26a641; }
        .react-calendar-heatmap .color-leetcode-4 { fill: #39d353; }
        .react-calendar-heatmap text { fill: #888; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        .heatmap-title { display: none; }
        .heatmap-wrapper { width: 100%; display: flex; justify-content: center; overflow-x: auto; padding: 10px 0; }
      `}} />

      <div className="max-w-[800px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="mb-8 text-center">
          <p className="text-[10px] text-muted uppercase tracking-[0.3em] mb-2 font-semibold">
            Problem Solving
          </p>
          <h2 className="text-3xl md:text-4xl font-display italic tracking-tight text-text-primary">
            LeetCode <span className="text-[#89AACC]">Stats</span>
          </h2>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-muted">Loading stats...</div>
        ) : stats && (
          <div className="w-full flex flex-col gap-3">
            
            {/* Top Row: Solved & Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              {/* Solved Card */}
              <motion.div 
                className="bg-[#282828] rounded-[14px] p-5 flex flex-row items-center justify-between shadow-lg h-[210px] w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Circular Progress Gauge */}
                <div className="relative flex-shrink-0 flex items-center justify-center w-[130px] h-[130px]">
                  <svg width="130" height="130" className="transform rotate-[140deg]">
                    {/* Easy Background & Foreground */}
                    <circle cx="65" cy="65" r={circleRadius} stroke="rgba(0, 184, 163, 0.15)" strokeWidth="5" fill="transparent"
                      strokeDasharray={`${easyLen} ${C}`} strokeDashoffset={0} strokeLinecap="round" />
                    {easySolvedLen > 0 && (
                      <circle cx="65" cy="65" r={circleRadius} stroke="#00B8A3" strokeWidth="5" fill="transparent"
                        strokeDasharray={`${easySolvedLen} ${C}`} strokeDashoffset={0} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                    )}

                    {/* Medium Background & Foreground */}
                    <circle cx="65" cy="65" r={circleRadius} stroke="rgba(255, 192, 30, 0.15)" strokeWidth="5" fill="transparent"
                      strokeDasharray={`${medLen} ${C}`} strokeDashoffset={-medOffset} strokeLinecap="round" />
                    {medSolvedLen > 0 && (
                      <circle cx="65" cy="65" r={circleRadius} stroke="#FFC01E" strokeWidth="5" fill="transparent"
                        strokeDasharray={`${medSolvedLen} ${C}`} strokeDashoffset={-medOffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                    )}

                    {/* Hard Background & Foreground */}
                    <circle cx="65" cy="65" r={circleRadius} stroke="rgba(255, 55, 95, 0.15)" strokeWidth="5" fill="transparent"
                      strokeDasharray={`${hardLen} ${C}`} strokeDashoffset={-hardOffset} strokeLinecap="round" />
                    {hardSolvedLen > 0 && (
                      <circle cx="65" cy="65" r={circleRadius} stroke="#FF375F" strokeWidth="5" fill="transparent"
                        strokeDasharray={`${hardSolvedLen} ${C}`} strokeDashoffset={-hardOffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                    )}
                  </svg>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
                    <div className="flex items-baseline text-white">
                      <span className="text-[34px] font-semibold tracking-tight leading-none">{stats.totalSolved}</span>
                      <span className="text-[11px] text-[#888] font-mono ml-0.5">/{stats.totalQuestions}</span>
                    </div>
                    <div className="flex items-center text-white mt-1">
                      <CheckCircle2 size={12} className="mr-1 text-[#00B8A3]" />
                      <span className="text-[11px] font-medium text-[#eee]">Solved</span>
                    </div>
                  </div>

                  {/* Bottom "Attempting" Text */}
                  <div className="absolute -bottom-2 text-[11px] text-[#888] font-medium tracking-wide">
                    4 Attempting
                  </div>
                </div>

                {/* Difficulty Breakdown */}
                <div className="flex flex-col gap-2 w-full max-w-[140px]">
                  <div 
                    className="bg-[#333333] rounded-lg px-2 flex flex-col items-center justify-center h-[52px] cursor-default transition-colors"
                    onMouseEnter={() => setHoveredDiff('easy')}
                    onMouseLeave={() => setHoveredDiff(null)}
                  >
                    {hoveredDiff === 'easy' ? (
                      <>
                        <span className="text-white text-[12px] font-medium mb-0.5">Beats</span>
                        <span className="text-white font-semibold text-[13px]">{beats.easy}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#00B8A3] text-[12px] font-medium mb-0.5">Easy</span>
                        <span className="text-white font-semibold text-[13px]">
                          {stats.easySolved}<span className="text-[#888] font-normal text-[11px] ml-1">/{stats.totalEasy}</span>
                        </span>
                      </>
                    )}
                  </div>
                  <div 
                    className="bg-[#333333] rounded-lg px-2 flex flex-col items-center justify-center h-[52px] cursor-default transition-colors"
                    onMouseEnter={() => setHoveredDiff('medium')}
                    onMouseLeave={() => setHoveredDiff(null)}
                  >
                    {hoveredDiff === 'medium' ? (
                      <>
                        <span className="text-white text-[12px] font-medium mb-0.5">Beats</span>
                        <span className="text-white font-semibold text-[13px]">{beats.medium}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#FFC01E] text-[12px] font-medium mb-0.5">Med.</span>
                        <span className="text-white font-semibold text-[13px]">
                          {stats.mediumSolved}<span className="text-[#888] font-normal text-[11px] ml-1">/{stats.totalMedium}</span>
                        </span>
                      </>
                    )}
                  </div>
                  <div 
                    className="bg-[#333333] rounded-lg px-2 flex flex-col items-center justify-center h-[52px] cursor-default transition-colors"
                    onMouseEnter={() => setHoveredDiff('hard')}
                    onMouseLeave={() => setHoveredDiff(null)}
                  >
                    {hoveredDiff === 'hard' ? (
                      <>
                        <span className="text-white text-[12px] font-medium mb-0.5">Beats</span>
                        <span className="text-white font-semibold text-[13px]">{beats.hard}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#FF375F] text-[12px] font-medium mb-0.5">Hard</span>
                        <span className="text-white font-semibold text-[13px]">
                          {stats.hardSolved}<span className="text-[#888] font-normal text-[11px] ml-1">/{stats.totalHard}</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Badges Card */}
              <motion.div 
                className="bg-[#282828] rounded-[14px] p-5 flex flex-col shadow-lg relative group overflow-hidden cursor-pointer h-[210px] w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {/* Top: Badges and Arrow */}
                <div className="flex justify-between items-start z-10 w-full">
                  <div className="flex flex-col">
                    <div className="text-[#eee] text-[13px] font-medium mb-1">Badges</div>
                    <div className="text-2xl text-white font-semibold">{badge.count}</div>
                  </div>
                  <ChevronRight size={20} className="text-[#888] group-hover:text-white transition-colors" />
                </div>
                
                {/* Center: Badge Image */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <img src={badge.icon} alt={badge.name} className="w-[84px] h-[84px] object-contain drop-shadow-md" />
                </div>
                
                {/* Bottom: Most Recent Badge */}
                <div className="mt-auto z-10">
                  <div className="text-[#888] text-[11px] mb-0.5">Most Recent Badge</div>
                  <div className="text-white text-[14px] font-medium">{badge.name}</div>
                </div>
              </motion.div>
              
            </div>

            {/* Bottom Row: Heatmap */}
            <motion.div 
              className="bg-[#282828] rounded-[14px] p-5 shadow-lg flex flex-col w-full overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 pb-3 border-b border-[#333]">
                <div className="text-white font-semibold mb-2 md:mb-0 flex items-center">
                  <span className="text-lg mr-1.5">{calendarStats.submissions}</span> 
                  <span className="text-muted text-xs font-normal">submissions in the past one year</span>
                </div>
                <div className="flex gap-4 text-[10px] font-mono">
                  <div className="text-muted">Total active days: <span className="text-white ml-0.5">{calendarStats.activeDays}</span></div>
                  <div className="text-muted">Max streak: <span className="text-white ml-0.5">{calendarStats.streak}</span></div>
                </div>
              </div>

              {/* Heatmap Component */}
              <div className="w-full text-xs overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="min-w-[750px] pr-4">
                  <CalendarHeatmap
                    startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                    endDate={new Date()}
                    values={calendarData}
                    classForValue={(value: any) => {
                      if (!value || value.count === 0) return 'color-empty';
                      if (value.count >= 7) return 'color-leetcode-4';
                      if (value.count >= 3) return 'color-leetcode-3';
                      if (value.count >= 2) return 'color-leetcode-2';
                      return 'color-leetcode-1';
                    }}
                    titleForValue={(value: any) => {
                      if (!value || !value.date) return 'No submissions';
                      return `${value.count} submissions on ${value.date}`;
                    }}
                    showWeekdayLabels={true}
                    gutterSize={4}
                  />
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </section>
  );
}
