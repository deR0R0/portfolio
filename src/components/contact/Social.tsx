'use client';

import Link from "next/link";
import { SiDiscord, SiFacebook, SiGithub, SiModrinth, SiThunderstore } from "react-icons/si";

export default function Social( { link, username, type } : { link: string, username: string, type: string } ) {
    const getIcon = () => {
        switch (type) {
            case 'github':
                return <SiGithub className="w-6 h-6" />;
            case 'modrinth':
                return <SiModrinth className="w-6 h-6" />;
            case 'thunderstore':
                return <SiThunderstore className="w-6 h-6" />;
            case 'discord':
                return <SiDiscord className="w-6 h-6" />;
            case 'facebook':
                return <SiFacebook className="w-6 h-6" />;
            default:
                return null;
        }
    }

    return (
        <Link aria-label={`Link to Robert Zhao's ${type}`} href={link} className="flex flex-row items-center space-x-2 w-fit md:ml-auto">
            {getIcon()}
            <span className="text-lg">@{username}</span>
        </Link>
    );
}