'use client';

import { FiDownload, FiExternalLink, FiStar } from "react-icons/fi";
import Link from "next/link";
import { BsQuestionCircle } from "react-icons/bs";

export default function Project( { name, description, url, tags, impressions, impressionType, updatedAt } : { name: string, description: string, url: string, tags: string[], impressions: number, impressionType: string, updatedAt: string } ) {
    const getIcon = () => {
        switch (impressionType) {
            case "stars":
                return <FiStar className="w-5 h-5" />;
            case "downloads":
                return <FiDownload className="w-5 h-5" />;
            default:
                return <BsQuestionCircle className="w-5 h-5" />;
        }
    }

    const getRelativeTime = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 }
        ];

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
            }
        }

        return 'just now';
    }

    return (
        <div className={`project ${tags.join(" ")} w-full border-t-2 border-zinc-300 py-10 flex md:flex-row flex-col hover:scale-[102%] transition-transform duration-200`}>
            <div className="flex flex-col">
                <div className="tags space-x-3 space-y-3 flex flex-row flex-wrap">
                    {tags.map(tag => (
                        <span key={tag} className="border-2 border-zinc-300 bg-zinc-300 p-1 px-2 rounded-full">{tag}</span>
                    ))}
                </div>
                <h1 className="text-3xl font-bold mt-5">{name}</h1>
                <p className="text-zinc-600 mt-3">{description}</p>

                <Link
                    href={url}
                    className="text-blue-500 mt-5 hover:underline w-fit"
                >
                    <div className="flex flex-row">
                        <span>View Project</span>
                        <FiExternalLink className="ml-1 text-sm" />
                    </div>
                </Link>
            </div>
            <div className="flex flex-col md:ml-auto ml-0">
                <div className="flex flex-row md:mt-0 mt-5 md:space-y-3 space-y-5">
                    {getIcon()}
                    <span className="ml-2">{impressions}</span>
                </div>
                <span className="text-zinc-500 text-sm">{getRelativeTime(updatedAt)}</span>
            </div>
        </div>
    )
}