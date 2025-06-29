import { motion } from "motion/react";

export default function ScrollingHobbyList({ initial, animate }: { initial?: string, animate?: string }) {
    return(
        <div className="scrolling-hobby-list flex flex-row overflow-hidden whitespace-nowrap w-full relative">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 z-10" style={{
            background: "linear-gradient(to right, white 70%, transparent 100%)"
          }} />
          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 z-10" style={{
            background: "linear-gradient(to left, white 70%, transparent 100%)"
          }} />
          <motion.span
            className="text-xl"
            initial={{ x: initial || "0%" }}
            animate={{ x: animate || "-55%" }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            Frontend Developer • Pianist • Gamer • Designer • Student • App Developer • Python Enthusiast • Backend Developer • Frontend Developer • Pianist • Gamer • Designer • Student • App Developer • Python Enthusiast •
          </motion.span>
        </div>
    )
}