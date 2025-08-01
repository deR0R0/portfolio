'use client';

import { BsQuestionCircleFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { FaCode, FaServer } from "react-icons/fa6";

export default function TimelineItem({ type, title, description, date }: { type: string, title: string, description: string, date: string }) {
    
    function getTimelineItemIcon() {
        switch(type) {
            case "programming":
                return <FaCode color="#71717b" className="w-5 h-5 mx-auto" />;
            case "server":
                return <FaServer color="#71717b" className="w-5 h-5 mx-auto" />;
            case "education":
                return <FaGraduationCap color="#71717b" className="w-5 h-5 mx-auto" />;
            case "start":
                return <div className="w-5 h-5 rounded-full mx-auto bg-zinc-400" />;
            default:
                return <BsQuestionCircleFill color="#71717b" className="w-5 h-5 mx-auto" />;
        }
    }

    return (
        <div className="timeline-item flex flex-row mt-5 w-full h-fit relative">
            <div className="flex flex-col w-1/4 h-fit mt-1">
                {getTimelineItemIcon()}
                { type === "start" ? null : <div className="absolute left-7.5 top-9 border-r-2 border-zinc-300 w-1 bottom-0"/>}
            </div>
            <div className="flex flex-col w-full">
                <p className="text-xs text-zinc-400 font-light mt-1.5">{date}</p>
                <h1 className="mt-3 text-2xl font-semibold text-red-400">{title}</h1>
                <p className="mt-2 text-sm tracking-wide">{description}</p>
            </div>
        </div>
    );
}