import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"

// Star constellation data - groups of stars that form constellations
const constellations = [
  // Constellation 1 - Large triangle pattern (top-left area)
  [
    { x: "5%", y: "15%", size: 2, opacity: 0.8 },
    { x: "12%", y: "25%", size: 1.5, opacity: 0.6 },
    { x: "8%", y: "35%", size: 2.5, opacity: 0.9 },
    { x: "15%", y: "42%", size: 1, opacity: 0.4 },
    { x: "3%", y: "45%", size: 1.8, opacity: 0.7 },
  ],
  // Constellation 2 - Dipper pattern (top-right area)
  [
    { x: "75%", y: "8%", size: 2.2, opacity: 0.85 },
    { x: "80%", y: "15%", size: 1.8, opacity: 0.7 },
    { x: "85%", y: "22%", size: 2.5, opacity: 0.9 },
    { x: "88%", y: "30%", size: 1.5, opacity: 0.6 },
    { x: "92%", y: "38%", size: 2, opacity: 0.75 },
    { x: "90%", y: "48%", size: 1.2, opacity: 0.5 },
    { x: "82%", y: "52%", size: 1.8, opacity: 0.65 },
  ],
  // Constellation 3 - Cross pattern (center-left area)
  [
    { x: "25%", y: "55%", size: 2, opacity: 0.8 },
    { x: "30%", y: "60%", size: 1.5, opacity: 0.6 },
    { x: "35%", y: "55%", size: 2.2, opacity: 0.85 },
    { x: "30%", y: "65%", size: 1.8, opacity: 0.7 },
    { x: "30%", y: "50%", size: 1.2, opacity: 0.5 },
  ],
  // Constellation 4 - Arc pattern (bottom-right area)
  [
    { x: "70%", y: "60%", size: 1.8, opacity: 0.7 },
    { x: "75%", y: "68%", size: 2.5, opacity: 0.9 },
    { x: "82%", y: "72%", size: 1.5, opacity: 0.6 },
    { x: "88%", y: "70%", size: 2, opacity: 0.8 },
    { x: "92%", y: "65%", size: 1.2, opacity: 0.45 },
    { x: "95%", y: "58%", size: 1.8, opacity: 0.65 },
  ],
  // Constellation 5 - Diamond pattern (bottom-left area)
  [
    { x: "10%", y: "65%", size: 2.2, opacity: 0.85 },
    { x: "18%", y: "72%", size: 1.5, opacity: 0.6 },
    { x: "12%", y: "80%", size: 1.8, opacity: 0.7 },
    { x: "5%", y: "75%", size: 2, opacity: 0.75 },
    { x: "8%", y: "88%", size: 1.2, opacity: 0.5 },
  ],
  // Constellation 6 - Line cluster (center area)
  [
    { x: "45%", y: "20%", size: 1.5, opacity: 0.6 },
    { x: "50%", y: "30%", size: 2.5, opacity: 0.9 },
    { x: "55%", y: "40%", size: 1.8, opacity: 0.7 },
    { x: "48%", y: "50%", size: 2, opacity: 0.8 },
    { x: "52%", y: "58%", size: 1.2, opacity: 0.45 },
  ],
]

// Random scattered stars (not in constellations)
const randomStars = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 1.5 + 0.5,
  opacity: Math.random() * 0.5 + 0.2,
  delay: Math.random() * 5,
}))

export function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden font-sans text-slate-900 dark:text-slate-200 bg-[#F0F0F0] dark:bg-[#0a0a0f]">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-30 dark:opacity-50" />
      <div className="fixed inset-0 bg-dot-pattern pointer-events-none opacity-20 dark:opacity-30" />
      
      {/* Night sky - Star constellations and scattered stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Random scattered stars */}
        {randomStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Constellation star groups with connecting lines */}
        {constellations.map((constellation, cIndex) => (
          <div
            key={cIndex}
            className="absolute"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {/* SVG constellation lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: 0.15 }}
            >
              {constellation.map((star, sIndex) => {
                if (sIndex === constellation.length - 1) return null
                const nextStar = constellation[sIndex + 1]
                return (
                  <line
                    key={sIndex}
                    x1={star.x}
                    y1={star.y}
                    x2={nextStar.x}
                    y2={nextStar.y}
                    stroke="white"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                  />
                )
              })}
              {/* Connect last to first for closed constellation */}
              <line
                x1={constellation[constellation.length - 1].x}
                y1={constellation[constellation.length - 1].y}
                x2={constellation[0].x}
                y2={constellation[0].y}
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            </svg>
            
            {/* Constellation stars with twinkling */}
            {constellation.map((star, sIndex) => (
              <motion.div
                key={sIndex}
                className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                style={{
                  left: star.x,
                  top: star.y,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                }}
                animate={{
                  opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + sIndex * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* Animated gradient orbs - Green orb traveling clockwise around the screen */}
      <motion.div 
        className="fixed w-[500px] h-[500px] bg-[#00ff88]/12 dark:bg-[#00ff88]/5 rounded-full blur-[100px] pointer-events-none"
        animate={{
          x: ["-10vw", "110vw"],
          y: ["10vh", "10vh", "90vh", "90vh", "10vh"],
        }}
        transition={{
          x: { duration: 30, repeat: Infinity, ease: "linear" },
          y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      
      {/* Animated gradient orb - Cyan orb traveling counter-clockwise around the screen */}
      <motion.div 
        className="fixed w-[400px] h-[400px] bg-[#00d4ff]/10 dark:bg-[#00d4ff]/5 rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: ["110vw", "-10vw"],
          y: ["90vh", "90vh", "10vh", "10vh", "90vh"],
        }}
        transition={{
          x: { duration: 35, repeat: Infinity, ease: "linear" },
          y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      
      {/* Animated gradient orb - Purple orb traveling in a figure-8 pattern */}
      <motion.div 
        className="fixed w-[300px] h-[300px] bg-[#F7A355]/8 dark:bg-[#F79E55]/3 rounded-full blur-[80px] pointer-events-none"
        animate={{
          x: ["-5vw", "105vw", "105vw", "-5vw", "-5vw"],
          y: ["50vh", "50vh", "20vh", "80vh", "50vh"],
        }}
        transition={{
          x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-[90%]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
