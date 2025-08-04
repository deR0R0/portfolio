'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HomePageLoader from "@/components/MainLoader";
import Project from "@/components/Project";
import { motion } from "motion/react";
import { LuLoaderCircle } from "react-icons/lu";
import Footer from "@/components/Footer";


export default function Projects() {
    const [loaded, setLoaded] = useState(false);
    const [repositories, setRepositories] = useState<any[]>([]);
    const [lastUpdated, setLastUpdated] = useState<string>("?");
    const tl = useRef(gsap.timeline({ paused: true }));

    useEffect(() => {
        // send a custom event to the window
        const handleOnLoad = () => {
            document.querySelector(".navigation")?.classList.remove("hidden");
            document.getElementsByClassName("loading-status")[0]?.classList.add("opacity-0");
            window.dispatchEvent(new Event("ready-for-entry"));

            // start the timeline animation after a delay, or the page animation thingy
            setTimeout(() => {
                setLoaded(true);
                tl.current.play();
            }, 2000);
        }

        if (document.readyState === "complete") {
            handleOnLoad();
        } else {
            window.addEventListener("load", handleOnLoad);
            return () => window.removeEventListener("load", handleOnLoad);
        }
    }, []);

    useEffect(() => {
        if(!loaded) return;

        const fetchRepositories = async () => {
            try {
                const repositories = await fetch("/api/github");

                if (!repositories.ok) {
                    throw new Error("Failed to fetch repositories");
                }

                const data = await repositories.json();
                setRepositories(data.repositories || []);
                setLastUpdated(data.lastUpdated || "?");
            } catch (error) {
                console.error("Error fetching repositories:", error);
            }
                
        };

        fetchRepositories();
    }, [loaded]);

    const getRelativeTime = () => {
        if(lastUpdated === "?") return "Unknown";

        const now = new Date().getTime();

        // simplified version because it updates every 10 mins either way

        // just now (within 1 min)
        if(now - Number(lastUpdated) < 60 * 1000) {
            return "just now";
        }

        // within 10 mins
        if(now - Number(lastUpdated) < 10 * 60 * 1000) {
            return Math.floor((now - Number(lastUpdated)) / (1000 * 60)) + " minutes ago";
        }



    }

    // return loading page
    if (!loaded) {
        return (
            <HomePageLoader />
        );
    }
    
    return (
        <div className="main-content flex flex-col">
            <div className="mx-auto text-center">
                <h1 className="text-5xl mt-10">Projects</h1>
                <p className="mt-5 text-zinc-500">Here is the collection of projects I&apos;ve worked on.</p>
                <p className="mt-1 text-zinc-500">This is automatically generated from my GitHub repositories.</p>
            </div>
            <div className="project-list w-fluid-lg mx-auto mt-20">
                {
                    Array.isArray(repositories) && repositories.length > 0 ? repositories.filter(repo => repo.tags.length > 1).map((repository) => (
                        <Project
                            key={repository.name}
                            name={repository.name}
                            description={repository.description}
                            url={repository.url}
                            tags={repository.tags}
                            impressions={repository.stars}
                            impressionType="stars"
                            updatedAt={repository.updatedAt}
                        />
                    )) : <div className="flex justify-center">
                            <LuLoaderCircle className="w-10 h-10 animate-spin mr-5" />
                            <p className="text-3xl">Loading Projects...</p>
                        </div>
                }
            </div>
            <div className="project-list-uncategorized w-fluid-lg mx-auto mt-50">
                <h1 className="text-3xl mb-5 font-bold">Uncategorized Projects</h1>
                <p className="text-zinc-500 mb-5">These projects are not categorized or do not have tags.</p>
                {
                    repositories.filter(repo => repo.tags.length === 1).map((repository) => (
                        <Project
                            key={repository.name}
                            name={repository.name}
                            description={repository.description}
                            url={repository.url}
                            tags={repository.tags}
                            impressions={repository.stars}
                            impressionType="stars"
                            updatedAt={repository.updatedAt}
                        />
                    ))
                }
                {
                    lastUpdated !== "?" && (
                        <h1 className="w-fluid-lg border-t-2 border-zinc-300 pt-10">Last Updated: {getRelativeTime()}</h1>
                    ) || (
                        null
                    )
                }
            </div>

            <Footer />
        </div>
    )
}