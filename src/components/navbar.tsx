'use client'

import { figtree } from "@/app/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, MorphSVGPlugin } from "gsap/all";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "./ScrollProvider";
import MagneticClickable from "./MagneticClickable";
import { off } from "process";
import { linearGradient } from "motion/react-client";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(MorphSVGPlugin);

export default function Navbar({ mobile, className}: { mobile?: boolean, className?: string}) {
    const lenis = useLenis();
    const [navOpen, setNavOpen] = useState(false);

    const tl = useRef(gsap.timeline({ paused: true }));


    const handleNavigationAnimations = (opening: boolean) => {
        if (opening) {
            tl.current.play(0); // play the timeline
        } else {
            tl.current.reverse();
        }
    }

    
    useGSAP(() => {
        // timeline animations
        const navigationSplit = new SplitText(".navigation-title", { type: "chars" });
        const homeSplit = new SplitText(".home-button", { type: "chars" });
        const aboutSplit = new SplitText(".about-button", { type: "chars" });
        const projectsSplit = new SplitText(".projects-button", { type: "chars" });
        const contactSplit = new SplitText(".contact-button", { type: "chars" });
        const copyrightSplit = new SplitText(".copyright-notice", { type: "words" });

        tl.current.clear();

        tl.current
        .fromTo(navigationSplit.chars, {
            y: 30
        }, {
            duration: 0.35,
            y: 0,
            opacity: 1,
            stagger: 0.02,
            ease: "sine.out",
        }, "+=0.75")
        .fromTo(homeSplit.chars, {
            y: 50
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1")
        .fromTo(aboutSplit.chars, {
            y: 50
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1")
        .fromTo(projectsSplit.chars, {
            y: 50
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1")
        .fromTo(contactSplit.chars, {
            y: 50
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1")
        .fromTo(copyrightSplit.words, {
            y: 50,
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1"
        );

        // stop the events below if on mobile, we want the universal nav bar to be visible at all times
        if(mobile) return;

        // hide the button to open the universal nav bar when on load.
        gsap.fromTo(".opener", { scale: 1 }, { scale: 0, duration: 0.01})

        // show the button when user scroll past the top of the page
        ScrollTrigger.create({
            trigger: "nav",
            start: "top top",
            end: "bottom top",
            onEnterBack: () => {
                gsap.fromTo(".opener", { scale: 1 }, { scale: 0, duration: 0.25, ease: "power1.inOut"})
                console.log("entered")
            },
            onLeave: () => { gsap.fromTo(".opener", { scale: 0 }, { scale: 1, duration: 0.5, ease: "bounce.out"}) },
        })
    })

    const toggleUniversalNav = () => {
        var offsetAmount = "42rem"
        
        if (navOpen) {
            gsap.to(".universal-nav", { y: "0rem", duration: 1.25, ease: "power3.inOut" });
            setNavOpen(false);
            lenis?.start();
            handleNavigationAnimations(false);
        } else {
            gsap.to(".universal-nav", { y: offsetAmount, duration: 1.25, ease: "power3.inOut" });
            setNavOpen(true);
            lenis?.stop();
            handleNavigationAnimations(true);
        }
    }

    const hideOthers = (hovered: HTMLDivElement) => {
        const buttons = document.querySelectorAll(".home-button, .about-button, .projects-button, .contact-button");
        const bgs = document.querySelectorAll(".home-button-bg, .about-button-bg, .projects-button-bg, .contact-button-bg");
        buttons.forEach((button) => {
            if (button !== hovered) {
                gsap.to(button, { opacity: 0.25, duration: 0.5 });
                gsap.to(button, { color: "white", duration: 0.25 });
            } else {
                gsap.to(button, { opacity: 1, duration: 0.5 });
                gsap.to(bgs.item([...buttons].indexOf(button)), { x: "13rem", duration: 0.25, ease: "power1.inOut" });
                gsap.to(button, { color: "#27272a", duration: 0.25 });
            }
        })
    }

    const showAll = () => {
        const buttons = document.querySelectorAll(".home-button, .about-button, .projects-button, .contact-button");
        const bgs = document.querySelectorAll(".home-button-bg, .about-button-bg, .projects-button-bg, .contact-button-bg");
        buttons.forEach((button) => {
            gsap.to(button, { opacity: 1, duration: 0.5 });
            gsap.to(bgs.item([...buttons].indexOf(button)), { x: "0rem", duration: 0.25, ease: "power1.inOut" });
            gsap.to(button, { color: "white", duration: 0.25 });
        })
    }


    return (
        <div className={"flex flex-col " + className}>
            <MagneticClickable className="fixed top-10 right-10 w-20 h-20 z-50 rounded-full" stiffness={125}>
                <button tabIndex={-1} className="opener fixed w-20 h-20 bg-zinc-800 rounded-full" onClick={toggleUniversalNav}>
                    <svg className="m-auto" width="3rem" height="3rem" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path className="path1 duration-500" fill="white" d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"/>
                    </svg>
                </button>
            </MagneticClickable>
            {/* Universal Navigation */}
            <div className="universal-nav fixed -top-[42rem] left-0 w-full h-[42rem] bg-zinc-800 text-5xl text-white flex flex-col z-40">
                <div className="navigation-title flex flex-rol w-fit mt-16 ml-10 overflow-clip">
                    <span className="text-sm text-zinc-500">NAVIGATION</span>
                </div>
                <div
                    className="home-button flex flex-rol w-fit p-2 mt-12 ml-8 overflow-clip relative"
                    onMouseEnter={e => hideOthers(e.currentTarget)}
                    onMouseLeave={showAll}
                >
                    {/* Hide this from tab selection */}
                    <div className="absolute top-0 -left-52 w-full h-full home-button-bg bg-white z-0" />
                    <Link
                        tabIndex={-1}
                        href="/"
                    >Home</Link>
                </div>
                <div
                    className="about-button flex flex-rol w-fit p-2 mt-12 ml-8 overflow-clip relative"
                    onMouseEnter={e => hideOthers(e.currentTarget)}
                    onMouseLeave={showAll}
                >
                    <div className="absolute top-0 -left-52 w-full h-full about-button-bg bg-white" />
                    <Link
                        tabIndex={-1}
                        href="/about"
                    >About</Link>
                </div>
                <div
                    className="projects-button flex flex-rol w-fit p-2 mt-12 ml-8 overflow-clip relative"
                    onMouseEnter={e => hideOthers(e.currentTarget)}
                    onMouseLeave={showAll}    
                >
                    <div className="absolute top-0 -left-52 w-full h-full projects-button-bg bg-white" />
                    <Link
                        tabIndex={-1}
                        href="/projects"
                    >Projects</Link>
                </div>
                <div 
                    className="contact-button flex flex-rol w-fit p-2 mt-12 ml-8 overflow-clip relative"
                    onMouseEnter={e => hideOthers(e.currentTarget)}
                    onMouseLeave={showAll}
                >
                    <div className="absolute top-0 -left-52 w-full h-full contact-button-bg bg-white" />
                    <Link
                        tabIndex={-1}
                        href="/contact"
                    >Contact</Link>
                </div>
                <div className="copyright-notice flex flex-rol w-fit mt-16 ml-10 overflow-clip">
                    <span className="text-sm text-zinc-500">© MIT License Robert Zhao</span>
                </div>
            </div>
            {/* Navigation Bar */}
            <nav className={`top-bar-nav w-full h-16 md:flex flex-row text-xl bg-transparent text-gray-800 hidden`}>
                <Link 
                    className={`my-auto ml-10`}
                    href="/"
                >Created by Robert</Link>
                <div className="button-group flex flex-row ml-auto my-auto">
                    <MagneticClickable className={"hover:bg-zinc-200 rounded-2xl transition-colors duration-300"} stiffness={50}>
                        <Link
                            className={`mx-5 w-fit`}
                            href="/about"
                        >About</Link>
                    </MagneticClickable>
                    <MagneticClickable className={"hover:bg-zinc-200 rounded-2xl transition-colors duration-300"} stiffness={50}>
                        <Link
                            className={`mx-5 w-fit`}
                            href="/projects"
                        >Projects</Link>
                    </MagneticClickable>
                    <MagneticClickable className={"hover:bg-zinc-200 rounded-2xl transition-colors duration-300 mr-5"} stiffness={50}>
                        <Link
                            className={`mr-5 ml-5 w-fit`}
                            href="/contact"
                        >Contact</Link>
                    </MagneticClickable>
                </div>
            </nav>            
            
        </div>
    );
}