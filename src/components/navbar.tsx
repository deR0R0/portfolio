'use client'

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, MorphSVGPlugin } from "gsap/all";
import Link from "next/link";
import { useLenis } from "./ScrollProvider";
import MagneticClickable from "./MagneticClickable";
import { useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(MorphSVGPlugin);

export default function Navbar({ className}: { className?: string}) {
    const router = useTransitionRouter();
    const lenis = useLenis();
    const [navOpen, setNavOpen] = useState(false);

    const tl = useRef(gsap.timeline({ paused: true }));

    const removeEntryAnimationElements = () => {
        const mainDiv = document.querySelector(".page-animation");
        // changed this to only hide the entry animation div
        // this is because we want to keep the entry animation
        // for page animations! (e.g: exit/entry animations)
        mainDiv?.classList.add("hidden");
        //mainDiv?.remove();
    }


    const handleNavigationAnimations = (opening: boolean) => {
        if (opening) {
            tl.current.play(0); // play the timeline
        } else {
            tl.current.reverse();
        }
    }

    const handleExitAnimation = () => {
        return new Promise<void>((resolve) => {
            // check for if the universal nav is open, if so, close it
            if(navOpen) {
                toggleUniversalNav();
            }

            // create a local timeline for the page transition
            const pageTl = gsap.timeline({ onComplete: resolve});
            
            // stop lenis scrolling
            pageTl.call(() => {lenis?.stop();});

            pageTl.delay(0.5);

            pageTl.call(() => { document.querySelector(".page-animation")?.classList.remove("hidden"); });

            pageTl.fromTo(".page-animation", {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
            }, 0.25);

            pageTl.fromTo(".page-animation", {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
            }, "<");
            
            pageTl.fromTo(".svg-wrapper", {
                x: "-100%",
            }, {
                x: "0%",
                duration: 1.5,
                ease: "power3.inOut",
            }, "<+=0.5");

            // play the timeline
            pageTl.play(0);
        });
    }

    const handleEntryAnimation = () => {
        return new Promise<void>((resolve) => {
            // create another local timeline for the page entry animation
            const pageTl = gsap.timeline( { onComplete: () => { lenis?.start(); resolve(); } });

            // entry animation part of the timeline
            pageTl.call(() => {lenis?.stop();});
            pageTl.fromTo(".svg-wrapper", {
                x: "0%",
            }, {
                x: "-100%",
                duration: 1.5,
                ease: "power3.inOut",
            }, 0);

            pageTl.fromTo(".svg-wrapper", {
                scaleX: 1,
                scaleY: 1
            }, {
                scaleX: 1.2,
                scaleY: 0.98,
                duration: 0.75,
                ease: "power3.in",
            }, "<");

            pageTl.fromTo(".svg-wrapper", {
                scaleX: 1.2,
                scaleY: 0.98
            }, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.75,
                ease: "power3.out",
            }, "<+=0.75");

            pageTl.fromTo(".page-label", {
                x: "700%"
            }, {
                x: "0%",
                duration: 1.5,
                ease: "power3.inOut",
            }, "<-=0.7");

            pageTl.fromTo(".page-label", {
                scaleX: 1,
                scaleY: 1
            }, {
                scaleX: 1.2,
                scaleY: 0.98,
                duration: 0.75,
                ease: "power3.in",
            }, "<");

            pageTl.fromTo(".page-label", {
                scaleX: 1.2,
                scaleY: 0.98
            }, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.75,
                ease: "power3.out",
            }, "<+=0.75");

            pageTl.fromTo(".page-animation", {
                opacity: 1,
            }, {
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
            }, "<+=1");

            pageTl.call(removeEntryAnimationElements, [], "<+=0.5");
        });
    }

    const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // prevent default link behavior, then get the element's href
        e.preventDefault();
        const link = e.currentTarget.getAttribute("href");

        // check if the link is the same as the current route
        if (link === window.location.pathname) {
            return;
        }

        // play the animations
        const current = window.location.pathname;
        const target = e.currentTarget.textContent;
        const pagelabel = document.querySelector(".page-label");

        // set the page label
        if (pagelabel) {
            pagelabel.textContent = current == "/" ? "Home" : current.charAt(1).toUpperCase() + current.substring(2);
        }

        await handleExitAnimation();

        document.querySelector(".page-animation")?.classList.remove("hidden");
        document.querySelector(".page-animation-loading")?.classList.remove("opacity-0");

        // we want to wait for the load event to be dispatched before we push the new route
        // this is because we want to show the loading page/stuff BEFORE the entry animation starts
        await new Promise<void>((resolve) => {
            window.addEventListener("ready-for-entry", () => resolve(), { once: true });
            // push the new route to the router
            router.push(link || "/");
        })
        
        document.querySelector(".page-animation-loading")?.classList.add("opacity-0");

        document.querySelector(".loading-status")?.classList.add("hidden");

        // set the new page label
        if (pagelabel) {
            pagelabel.textContent = target;
        }

        // entry animation after the route has changed
        await handleEntryAnimation();
    }

    
    useGSAP(() => {
        // mobile detection
        const agent = navigator.userAgent.toLowerCase();
        const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(agent);

        // timeline animations
        const navigationSplit = new SplitText(".navigation-title", { type: "chars" });
        const homeSplit = new SplitText(".home-button", { type: "chars" }); // TODO: fix split text so it doesn't interfere with the router
        const aboutSplit = new SplitText(".about-button", { type: "chars" });
        const projectsSplit = new SplitText(".projects-button", { type: "chars" });
        const contactSplit = new SplitText(".contact-button", { type: "chars" });
        const copyrightSplit = new SplitText(".copyright-notice", { type: "words" });

        tl.current.clear();

        tl.current
        .fromTo(navigationSplit.chars, {
            y: 30,
            opacity: 0
        }, {
            duration: 0.35,
            y: 0,
            opacity: 1,
            stagger: 0.02,
            ease: "sine.out",
        }, "+=0.75")
        .fromTo(homeSplit.chars, {
            y: 50,
            opacity: 0
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1")
        .fromTo(aboutSplit.chars, {
            y: 50,
            opacity: 0
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1")
        .fromTo(projectsSplit.chars, {
            y: 50,
            opacity: 0
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1")
        .fromTo(contactSplit.chars, {
            y: 50,
            opacity: 0
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1")
        .fromTo(copyrightSplit.words, {
            y: 50,
            opacity: 0
        }, {
            duration: 0.4,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "sine.out",
        }, "<+=0.1"
        );

        // dont let the rest of this stuff run on mobile
        if (isMobile) { return; }

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
    });

    const toggleUniversalNav = () => {
        const offsetAmount = "42rem"
        
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
        const buttons = document.querySelectorAll(".home-button-wrapper, .about-button-wrapper, .projects-button-wrapper, .contact-button-wrapper");
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
        const buttons = document.querySelectorAll(".home-button-wrapper, .about-button-wrapper, .projects-button-wrapper, .contact-button-wrapper");
        const bgs = document.querySelectorAll(".home-button-bg, .about-button-bg, .projects-button-bg, .contact-button-bg");
        buttons.forEach((button) => {
            gsap.to(button, { opacity: 1, duration: 0.5 });
            gsap.to(bgs.item([...buttons].indexOf(button)), { x: "0rem", duration: 0.25, ease: "power1.inOut" });
            gsap.to(button, { color: "white", duration: 0.25 });
        })
    }


    return (
        <div className={"flex flex-col " + className}>
            <MagneticClickable className="fixed md:top-10 md:right-10 top-5 right-5 w-20 h-20 z-50 rounded-full" stiffness={125}>
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
                    className="home-button-wrapper flex flex-rol w-fit p-2 mt-12 ml-8 overflow-clip relative"
                    onMouseEnter={e => hideOthers(e.currentTarget)}
                    onMouseLeave={showAll}
                >
                    {/* Hide this from tab selection */}
                    <div aria-hidden="true" className="absolute top-0 -left-52 w-full h-full home-button-bg bg-white pointer-events-none" />
                    <Link
                        tabIndex={ navOpen ? 0 : -1 }
                        href="/"
                        onClick={handleLinkClick}
                    ><span className="home-button">Home</span></Link>
                </div>
                <div
                    className="about-button-wrapper flex flex-rol w-fit p-2 mt-12 ml-8 overflow-clip relative"
                    onMouseEnter={e => hideOthers(e.currentTarget)}
                    onMouseLeave={showAll}
                >
                    <div aria-hidden="true" className="absolute top-0 -left-52 w-full h-full about-button-bg bg-white pointer-events-none" />
                    <Link
                        tabIndex={ navOpen ? 0 : -1 }
                        href="/about"
                        onClick={handleLinkClick}
                    ><span className="about-button">About</span></Link>
                </div>
                <div
                    className="projects-button-wrapper flex flex-rol w-fit p-2 mt-12 ml-8 overflow-clip relative"
                    onMouseEnter={e => hideOthers(e.currentTarget)}
                    onMouseLeave={showAll}    
                >
                    <div aria-hidden="true" className="absolute top-0 -left-52 w-full h-full projects-button-bg bg-white" />
                    <Link
                        tabIndex={ navOpen ? 0 : -1 }
                        href="/projects"
                        onClick={handleLinkClick}
                    ><span className="projects-button">Projects</span></Link>
                </div>
                <div 
                    className="contact-button-wrapper flex flex-rol w-fit p-2 mt-12 ml-8 overflow-clip relative"
                    onMouseEnter={e => hideOthers(e.currentTarget)}
                    onMouseLeave={showAll}
                >
                    <div aria-hidden="true" className="absolute top-0 -left-52 w-full h-full contact-button-bg bg-white" />
                    <Link
                        tabIndex={ navOpen ? 0 : -1 }
                        href="/contact"
                        onClick={handleLinkClick}
                    ><span className="contact-button">Contact</span></Link>
                </div>
                <div className="copyright-notice flex flex-rol w-fit mt-16 ml-10 overflow-clip">
                    <span className="text-sm text-zinc-500">© MIT License Robert Zhao</span>
                </div>
            </div>
            {/* Navigation Bar */}
            <nav className={`top-bar-nav w-full h-16 md:flex flex-row text-xl bg-transparent text-gray-800 hidden`}>
                <MagneticClickable className={"hover:bg-zinc-200 rounded-2xl transition-colors duration-300 my-auto ml-5"} stiffness={50}>
                        <Link
                            className={`mx-5 w-fit`}
                            href="/"
                            onClick={handleLinkClick}
                        >Home</Link>
                    </MagneticClickable>
                <div className="button-group flex flex-row ml-auto my-auto">
                    <MagneticClickable className={"hover:bg-zinc-200 rounded-2xl transition-colors duration-300"} stiffness={50}>
                        <Link
                            className={`mx-5 w-fit`}
                            href="/about"
                            onClick={handleLinkClick}
                        >About</Link>
                    </MagneticClickable>
                    <MagneticClickable className={"hover:bg-zinc-200 rounded-2xl transition-colors duration-300"} stiffness={50}>
                        <Link
                            className={`mx-5 w-fit`}
                            href="/projects"
                            onClick={handleLinkClick}
                        >Projects</Link>
                    </MagneticClickable>
                    <MagneticClickable className={"hover:bg-zinc-200 rounded-2xl transition-colors duration-300 mr-5"} stiffness={50}>
                        <Link
                            className={`mr-5 ml-5 w-fit`}
                            href="/contact"
                            onClick={handleLinkClick}
                        >Contact</Link>
                    </MagneticClickable>
                </div>
            </nav>            
            
        </div>
    );
}