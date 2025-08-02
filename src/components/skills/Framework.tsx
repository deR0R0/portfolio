'use client';

import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { SiElectron, SiNextdotjs, SiSpigotmc } from "react-icons/si";

export default function Framework({ framework, specialize }: { framework: string, specialize?: boolean }) {
    const getIcon = () => {
        switch (framework) {
            case 'Next.js':
                return <SiNextdotjs className="w-8 h-8" />;
            case 'SpigotMC':
                return <SiSpigotmc className="w-8 h-8" />;
            case 'Electron.js':
                return <SiElectron className="w-8 h-8" />;
            default:
                return <BsFillQuestionCircleFill className="w-8 h-8" />;
        }
    }

    return (
        <div className="relative flex flex-row h-15 md:w-50 w-20 border-2 border-zinc-300 justify-center items-center rounded-3xl transition-colors duration-300 hover:bg-zinc-200">
            {specialize && <span title="specialized" className="absolute -top-3 -left-3 text-3xl text-yellow-400"><FaStar /></span>}
            {getIcon()}
            <span className="ml-2 text-xl md:flex hidden">{framework}</span>
        </div>
    );
}