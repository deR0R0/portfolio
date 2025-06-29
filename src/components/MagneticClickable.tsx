import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticClickable({ children, className, stiffness }: { children: React.ReactNode, className?: string, stiffness?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const {height, width, left, top} = ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width/2)
        const middleY = clientY - (top + height/2)

        setPosition({x: middleX, y: middleY})
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: stiffness, damping: 15, mass: 0.25 }}
        >
            {children}
        </motion.div>
    );
}
