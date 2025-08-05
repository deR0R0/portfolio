'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HomePageLoader from "@/components/MainLoader";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import Social from "@/components/contact/Social";
import Footer from "@/components/Footer";

export default function Contact() {
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

    const allSocials = [
        { link: "https://github.com/deR0R0", username: "deR0R0", type: "github" },
        { link: "https://modrinth.com/user/deR0R0", username: "deR0R0", type: "modrinth" },
        { link: "https://thunderstore.io/c/lethal-company/p/RoroMods/", username: "RoroMods", type: "thunderstore" },
        { link: "https://discord.com/users/deroro_", username: "deroro_", type: "discord" },
        { link: "https://facebook.com/robert.zee.1029", username: "robert.zee.1029", type: "facebook" }
    ]


    // return loading page when not loaded
    if(!loaded) {
        return (
            <HomePageLoader />
        );
    }

    // actual context
    return (
        <div className="main-content flex flex-col">
            <h1 className="mx-auto text-5xl mt-10">Contact Me</h1>
            <div className="flex md:flex-row flex-col mt-20 space-y-20">
                <div className="flex flex-col md:w-[48%] w-full bg-white border-2 border-zinc-300 rounded-lg p-5 h-100">
                    <h2 className="text-5xl">Let&apos;s Talk!</h2>
                    <p className="text-sm mt-2">I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
                    <Link aria-label="Email Me at me@robertzhao.dev" href="mailto:me@robertzhao.dev" className="email mt-28 mx-auto flex flex-row items-center space-x-2 border-2 p-3 rounded-full border-zinc-300 hover:bg-zinc-100 transition-colors duration-300">
                        <FiMail className="w-10 h-10 text-red-400" />
                        <span className="text-2xl text-red-500">me@robertzhao.dev</span>
                    </Link>
                </div>
                <div className="md:flex hidden flex-col w-[4%]">
                    <div className="mx-auto">
                        <h2 className="text-sm mt-3">or...</h2>
                    </div>
                </div>
                <div className="flex flex-col md:w-[48%] w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg p-5 text-white md:text-right text-left h-100">
                    <h2 className="text-5xl">Other Socials</h2>
                    <p className="text-sm mt-2">You can also find me at these places!</p>
                    <div className="socials mt-5 space-y-3">
                        {allSocials.map((social, index) => (
                            <Social key={index} link={social.link} username={social.username} type={social.type} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer className="mt-100" />
        </div>
    )
}