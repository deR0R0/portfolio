'use client';

import { BsQuestionCircleFill } from "react-icons/bs";
import { FaCss3, FaHtml5, FaJava, FaPython, FaStar } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiTypescript } from "react-icons/si";


export default function Language( { language, specialize } : { language: string, specialize?: boolean }) {
    const getIcon = () => {
        switch (language) {
            case 'Java':
                return <FaJava className="w-8 h-8" />;
            case 'Python':
                return <FaPython className="w-8 h-8" />;
            case 'HTML':
                return <FaHtml5 className="w-8 h-8" />;
            case 'CSS':
                return <FaCss3 className="w-8 h-8" />;
            case 'Tailwind':
                return <SiTailwindcss className="w-8 h-8" />;
            case 'Javascript':
                return <SiJavascript className="w-8 h-8" />;
            case 'Typescript':
                return <SiTypescript className="w-8 h-8" />;
            default:
                return <BsQuestionCircleFill className="w-8 h-8" />;
        }
    }

    return (
        <div className="relative flex flex-row h-15 md:w-50 w-20 border-2 border-zinc-300 justify-center items-center rounded-3xl transition-colors duration-300 hover:bg-zinc-200">
            {specialize && <span title="specialized" className="absolute -top-3 -left-3 text-3xl text-yellow-400"><FaStar /></span>}
            {getIcon()}
            <span className="ml-2 text-xl md:flex hidden">{language}</span>
        </div>
    );
}