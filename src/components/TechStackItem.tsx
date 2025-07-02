'use client'

import Link from "next/link";
import gsap from "gsap";
import { useEffect, useState } from "react";

export default function TechStackItem({ experience, language, link, path, viewBox = "400"}: { experience: string, language: string, link: string, path: string, viewBox?: string}) {
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const agent = navigator.userAgent.toLowerCase();
        const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(agent);
        setMobile(isMobile);
    }, []);

    const showToolTip = (hovered: HTMLDivElement) => {
        // if the user is on mobile, do not show tooltips
        if(mobile) return;

        // otherwise, show the tooltip for the hovered item

        const allTechStackItems = document.querySelectorAll('.tech-stack-item');
        const allLanguages = document.querySelectorAll('.tech-stack-item-tooltip');

        allTechStackItems.forEach((item) => {
            // get the element's tooltip
            const tooltip = allLanguages[Array.from(allTechStackItems).indexOf(item)] as HTMLDivElement;

            // determine if the hovered item is the same as the current item
            if(item == hovered) {
                // show the tooltip
                tooltip.classList.remove("invisible");
                gsap.fromTo(tooltip, {
                    y: -25,
                    opacity: 0.5
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.25,
                    ease: "sine.out",
                })
            } else {
                // hide other tooltips
                tooltip.classList.add("invisible");
            }
        });
    }

    const hideAllToolTips = () => {
        const allLanguages = document.querySelectorAll('.tech-stack-item-tooltip');
        allLanguages.forEach((tooltip) => {
            tooltip.classList.add("invisible");
        });
    }


    return (
        <div 
            className={`tech-stack-item tech-stack-item-${language} relative`}
            onMouseEnter={(e) => showToolTip(e.currentTarget)}
            onMouseLeave={hideAllToolTips}
        >
            <Link href={link} target="_blank" rel="noopener noreferrer">
                <svg className="tech-stack-item-image min-w-20 min-h-20 fill-zinc-800" xmlns="http://www.w3.org/2000/svg" viewBox={`0, 0, ${viewBox},${viewBox}`}>
                    <title>{language + "icon"}</title>
                    <desc>{language + " icon. Icons are outline styled icons. Stroke size is approximately 3 pixels."}</desc>
                    <path d={path} />
                </svg>
            </Link>
            <div className={`tech-stack-item-tooltip absolute top-24 -left-[4rem] w-52 h-fit z-50 flex flex-col invisible`}>
                {/* de mythical triangle */}
                <div className="top-full mx-auto border-8 w-0 h-0 border-b-zinc-800 border-l-transparent border-r-transparent border-t-0"/>
                {/* tooltip content */}
                <div className="p-4 w-full h-full text-center bg-zinc-800 rounded-xl flex flex-col">
                    <span className="text-white">{language.toUpperCase()}</span>
                    <span className="text-sm text-zinc-400">{experience} Year(s)</span>
                </div>
            </div>
        </div>
    )
}