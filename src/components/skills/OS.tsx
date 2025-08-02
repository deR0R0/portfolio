'use client';

import { FaApple, FaStar, FaWindows } from "react-icons/fa";


export default function OS( { operatingSystem, specialize } : { operatingSystem: string, specialize?: boolean }) {
    const getIcon = () => {
        switch (operatingSystem) {
            case 'Windows':
                return <FaWindows className="w-8 h-8" />;
            case 'MacOS':
                return <FaApple className="w-8 h-8" />;
            default:
                return null;
        }
    }

    return (
        <div className="relative flex flex-row h-15 md:w-50 w-20 border-2 border-zinc-300 justify-center items-center rounded-3xl transition-colors duration-300 hover:bg-zinc-200">
            {specialize && <span title="specialized" className="absolute -top-3 -left-3 text-3xl text-yellow-400"><FaStar /></span>}
            {getIcon()}
            <span className="ml-2 text-xl md:flex hidden">{operatingSystem}</span>
        </div>
    );
}