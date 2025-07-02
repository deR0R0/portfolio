'use client';

import { motion } from "motion/react";

export default function ScrollingHobbyList({ className, mobile, initial, animate }: { className?: string, mobile?: boolean, initial?: string, animate?: string }) {
    return(
        <div className={`scrolling-hobby-list flex flex-row overflow-hidden whitespace-nowrap w-full relative ${className}`}>
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full md:w-12 w-6 z-10" style={{
            background: "linear-gradient(to right, white 70%, transparent 100%)"
          }} />
          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full md:w-12 w-6 z-10" style={{
            background: "linear-gradient(to left, white 70%, transparent 100%)"
          }} />
          <motion.span
            className="text-xl w-full"
            initial={{ x: initial || "0%" }}
            animate={{ x: animate || "-125%" }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            Frontend Developer • Pianist • Gamer • Designer • Student • App Developer • Python Enthusiast • Backend Developer • Frontend Developer • Pianist • Gamer • Designer • Student • App Developer • Python Enthusiast •
          </motion.span>
        </div>
    )
}