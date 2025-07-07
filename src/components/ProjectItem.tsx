'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

export default function ProjectItem( { name, description, link, image, tags, starsLink, downloadsLink, className = "", onMouseMove, onMouseLeave }: { name: string, description: string, link: string, downloadsLink?: string, image: string, tags: string[], starsLink?: string, className?: string, onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void, onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void }) {
    const [stars, setStars] = useState("?");
    const [downloads, setDownloads] = useState("?");

    useEffect(() => {

        // check for no links
        if((starsLink == undefined || starsLink == null) && downloadsLink == undefined) {
            return; // no links provided
        }

        const fetchStars = async () => {
            if(!starsLink) return; // no stars link provided
            const response = await fetch(starsLink);
            const data = await response.json();
            setStars(data.length + "");
        };

        const fetchDownloads = async () => {
            const response = await fetch("/api/thunderstore");
            const data = await response.json();
            setDownloads(data.downloads + "");
        }

        // check for idk?
        if(starsLink) {
            fetchStars();
        } else {
            fetchDownloads();
        }
    }, []);

    return (
        <div
            className={`project-item flex flex-col bg-white border-b-2 border-zinc-300 w-[95%] h-fit pb-10 ${className}`}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div className="project-item-header flex flex-col w-full">
                <div className="project-item-header-tags flex flex-row flex-wrap gap-2 mt-2 mb-1 w-full md:justify-normal justify-center">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-zinc-300 p-2 px-3 rounded-full md:text-xs text-xs">{tag}</span>
                    ))}
                </div>
                <Link
                    href={link}
                    target="_blank"
                    className="flex flex-row mt-5 no-underline md:hover:underline w-full md:w-fit"
                >
                    <div className="flex flex-row md:w-fit mx-auto">
                        <span className="font-bold text-4xl">{name}</span>
                        <FiExternalLink className="w-4 h-4 ml-2" />
                    </div>
                </Link>
            </div>
            <div className="project-item-body flex flex-col mt-5 md:w-3/4 md:text-left w-full text-center tracking-wider text-md">
                <span className="text-zinc-500 text-md">{description}</span>
                <Image
                    src={image}
                    alt={name}
                    className="project-item-image mt-5 rounded-lg md:hidden flex"
                    width={500}
                    height={300}
                />
                {starsLink ? (
                    <div className="project-item-body-stars mt-5 flex flex-row bg-amber-300 w-fit p-1 px-5 rounded-full ">
                        <FaStar className="mt-1 mr-1" />
                        <span>{stars}</span>
                    </div>
                ) : (
                    <div className="project-item-body-downloads mt-5 flex flex-row bg-blue-500 w-fit p-1 px-5 rounded-full ">
                        <FaDownload className="mt-1 mr-1" />
                        <span>{downloads}</span>
                    </div>
                )}
            </div>
        </div>
    )
}