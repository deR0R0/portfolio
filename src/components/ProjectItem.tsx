'use client';

import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export default function ProjectItem( { name, description, link, image, tags, className = "" }: { name: string, description: string, link: string, image: string, tags: string[], className?: string }) {
    return (
        <div className={`project-item flex flex-col bg-white border-b-2 border-zinc-300 w-full h-fit pb-10 ${className}`}>
            <div className="project-item-header flex flex-col">
                <div className="project-item-header-tags flex flex-row space-x-2 mt-2 mb-1">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-zinc-300 p-2 px-3 rounded-full text-xs">{tag}</span>
                    ))}
                </div>
                <Link
                    href={link}
                    target="_blank"
                    className="flex flex-row mt-5 no-underline hover:underline w-fit"
                >
                    <span className="font-bold text-4xl">{name}</span>
                    <FiExternalLink className="w-4 h-4 ml-2" />
                </Link>
            </div>
            <div className="project-item-body flex flex-col mt-5 w-3/4">
                <span className="text-zinc-500 text-md">{description}</span>
            </div>
        </div>
    )
}