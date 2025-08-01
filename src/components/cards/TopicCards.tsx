'use client';

import { MdInterests } from "react-icons/md";
import { InterestsCardItem } from "./CardItem";
import { IoCameraOutline, IoGameControllerOutline } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
import { FaCircleArrowDown, FaCode } from "react-icons/fa6";
import { TbCircuitBattery, TbTimelineEventFilled } from "react-icons/tb";
import { PiFilmSlate } from "react-icons/pi";
import { useState } from "react";
import { motion } from "motion/react";
import Timeline from "../timeline/Timeline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function InterestCard({ className } : { className?: string }) {
    useGSAP(() => {
        if(document.readyState !== "complete") return;

        gsap.to(".scroll-indicator", {
            scrollTrigger: {
                trigger: ".timeline",
                scroller: ".programming-timeline",
                start: "bottom bottom",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            duration: 0.1,
            ease: "easeInOut"
        })
    }, []);

    return (
        <motion.div
            className="flex flex-col w-card-mobile lg:w-card shadow-[0px_10px_25px_-5px_rgba(0,_0,_0,_0.15)] border-[2px] border-[#F1F1F1] rounded-2xl pb-5 h-[40rem]"
        >
            <div className="p-2 space-y-6.25">
                <MdInterests className="w-10 h-10 mt-3" />
                <h1 className="text-2xl mt-3 pb-5">Hobbies/Interests</h1>
                <InterestsCardItem color="bg-orange-400" title="Problem Solving">
                    <LuBrain className="w-6 h-6" />
                </InterestsCardItem>
                <InterestsCardItem color="bg-red-400" title="Electronics">
                    <TbCircuitBattery className="w-6 h-6" />
                </InterestsCardItem>
                <InterestsCardItem color="bg-yellow-400" title="Programming">
                    <FaCode className="w-6 h-6" />
                </InterestsCardItem>
                <InterestsCardItem color="bg-green-400" title="Photography">
                    <IoCameraOutline className="w-6 h-6" />
                </InterestsCardItem>
                <InterestsCardItem color="bg-blue-400" title="Video Editing">
                    <PiFilmSlate className="w-6 h-6" />
                </InterestsCardItem>
                <InterestsCardItem color="bg-purple-400" title="Gaming">
                    <IoGameControllerOutline className="w-6 h-6" />
                </InterestsCardItem>
            </div>
        </motion.div>
    )
}

export function ProgrammingTimeline({ className } : { className?: string }) {
    return (
        <div className={`programming-timeline relative flex flex-col w-card-mobile lg:w-card shadow-[0px_10px_25px_-5px_rgba(0,_0,_0,_0.15)] border-[2px] border-[#F1F1F1] rounded-2xl pb-5 min-h-0 h-[40rem] overflow-y-scroll ${className}`} data-lenis-prevent>
            <div className="p-2">
                <TbTimelineEventFilled className="w-10 h-10 mt-3" />
                <h1 className="text-2xl mt-3">Experience Timeline</h1>
                <Timeline />
                <motion.div
                    className="scroll-indicator opacity-0 sticky bottom-4 left-1/2 translate-x-[48%] z-10"
                    animate={{ y: 10 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.75, ease: "easeInOut" }}
                >
                    <FaCircleArrowDown
                        color="#71717b"
                        className="w-10 h-10"
                    />
                </motion.div>
            </div>
        </div>
    )
}

export function GithubStats({ className } : { className?: string }) {
    return (
        <div className={`github-stats flex flex-col w-card-mobile lg:w-card shadow-[0px_10px_25px_-5px_rgba(0,_0,_0,_0.15)] border-[2px] border-[#F1F1F1] rounded-2xl pb-5 h-[40rem] overflow-y-hidden ${className}`}>
            <div className="p-2">
                <FaCode className="w-10 h-10 mt-3" />
                <h1 className="text-2xl mt-3">GitHub Stats</h1>
                <div className="flex flex-col justify-center items-center">
                    <Image
                        width={400}
                        height={130}
                        priority={true}
                        src="https://github-readme-stats.vercel.app/api?username=deR0R0&theme=graywhite&show_icons=true&hide_border=true&count_private=true"
                        alt="GitHub Stats"
                        className="mt-4"
                        unoptimized={true}
                    />
                    <Image
                        width={400}
                        height={130}
                        priority={true}
                        src="https://github-readme-stats.hackclub.dev/api/wakatime?username=872&api_domain=hackatime.hackclub.com&&custom_title=Hackatime+Stats&layout=compact&cache_seconds=0&langs_count=8&theme=transparent&layout=compact&hide_border=true"
                        alt="GitHub Stats"
                        className="mt-4"
                        unoptimized={true}
                    />
                    <Image
                        width={400}
                        height={130}
                        priority={true}
                        src="https://github-readme-stats.vercel.app/api/top-langs/?username=deR0R0&theme=graywhite&show_icons=true&hide_border=true&layout=compact"
                        alt="GitHub Stats"
                        className="mt-4"
                        unoptimized={true}
                    />
                </div>
            </div>
        </div>
    )
}