'use client';

import Link from "next/link";
import { gsap, ScrollTrigger } from "gsap/all";
import { FaGithub } from "react-icons/fa";
import { SiModrinth, SiThunderstore } from "react-icons/si";
import { BiMailSend } from "react-icons/bi";

gsap.registerPlugin(ScrollTrigger);

export default function Footer( { className = "" } : { className?: string } ) {
    return (
        <footer className={`bg-zinc-800 text-white w-screen md:h-[30rem] h-[50rem] flex md:flex-row flex-col mt-52 ${className}`}>
            <div className="flex flex-col mx-auto mt-20 text-sm space-y-3">
                <span className="text-lg text-zinc-400 mb-3">Credits</span>
                <span>Created By Robert Zhao</span>
                <Link className="hover:underline" href="https://react-icons.github.io/react-icons">React Icons</Link>
                <span className="text-lg text-zinc-400">Inspiration</span>
                <Link className="hover:underline" href="https://dennissnellenberg.com">Dennis Snellenberg</Link>
                <Link className="hover:underline" href="https://dribbble.com/shots/22434425-Bento-Cards">Bento Cards - Dribbble</Link>
                <Link className="hover:underline" href="https://github.com/emmabostian/developer-portfolios">A Ton More!</Link>
            </div>
            <div className="flex flex-col mx-auto mt-20 text-sm space-y-3">
                <span className="text-lg text-zinc-400 mb-3">Other Pages</span>
                <Link className="hover:underline" href="/">Home/Landing</Link>
                <Link className="hover:underline" href="/about">About</Link>
                <Link className="hover:underline" href="/projects">Projects</Link>
                <Link className="hover:underline" href="/contact">Contact</Link>
            </div>
            <div className="flex flex-col mx-auto mt-20 text-sm">
                <span className="text-lg text-zinc-400 mb-3">Other Platforms</span>
                <div className="flex flex-row space-x-3">
                    <Link target="_blank" href="https://github.com/deR0R0"><FaGithub /></Link>
                    <Link target="_blank" href="https://modrinth.com/user/deR0R0"><SiModrinth /></Link>
                    <Link target="_blank" href="https://thunderstore.io/c/lethal-company/p/RoroMods/"><SiThunderstore /></Link>
                </div>
            </div>
            <div className="flex flex-col mx-auto mt-20 text-sm">
                <span className="text-lg text-zinc-400 mb-3">Contact</span>
                <div className="flex flex-row space-x-2">
                    <Link target="_blank" className="flex flex-row hover:underline" href="mailto:me@robertzhao.dev"><BiMailSend className="mt-1 mr-2" /> Email</Link>
                </div>
            </div>
        </footer>
    );
}