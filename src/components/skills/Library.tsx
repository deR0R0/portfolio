'use client';

import { BiQuestionMark } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { SiNextdotjs, SiReact } from "react-icons/si";

export default function Library({ library, specialize }: { library: string, specialize?: boolean }) {
    const getIcon = () => {
        switch (library) {
            case 'React':
                return <SiReact className="w-8 h-8" />;
            default:
                return <BiQuestionMark className="w-8 h-8" />;
        }
    }

    return (
        <div className="relative flex flex-row h-15 md:w-50 w-20 border-2 border-zinc-300 justify-center items-center rounded-3xl transition-colors duration-300 hover:bg-zinc-200">
            {specialize && <span title="specialized" className="absolute -top-3 -left-3 text-3xl text-yellow-400"><FaStar /></span>}
            {getIcon()}
            <span className="ml-2 text-xl md:flex hidden">{library}</span>
        </div>
    );
}