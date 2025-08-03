'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HomePageLoader from "@/components/MainLoader";


export default function Projects() {
    const [loaded, setLoaded] = useState(false);
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

        
    }, [loaded]);

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
        </div>
    )
}