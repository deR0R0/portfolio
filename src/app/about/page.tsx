'use client';

import { GithubStats, InterestCard, ProgrammingTimeline } from "@/components/cards/TopicCards";
import HomePageLoader from "@/components/MainLoader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin, ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SkillsSection from "@/components/skills/SkillsSection";
import OS from "@/components/skills/OS";
import Language from "@/components/skills/Language";
import Framework from "@/components/skills/Framework";
import Library from "@/components/skills/Library";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import Footer from "@/components/Footer";

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
            }, 2000); // we're delaying the page animation by 500ms to allow for the page transition to finish
        }

        if (document.readyState === "complete") {
            handleOnLoad();
        } else {
            window.addEventListener("load", handleOnLoad);
            return () => window.removeEventListener("load", handleOnLoad);
        }
    }, []);

    // timeline animation
    useGSAP(() => {
        // added this to shut gsap up about missing targets
        if(!loaded) return;

        // refresh scroll triggers - this allows the universal nav button to work properly
        ScrollTrigger.refresh();

        // draw the svg text
        tl.current.fromTo(".about-text-writeon path", {
            drawSVG: "0%",
        }, {
            drawSVG: "100%",
            duration: 0.75,
            ease: "power3.inOut",
            stagger: 0.4,
        });

        // animate all the cards and card content
        tl.current.fromTo(".card", {
            y: 100,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.inOut",
            stagger: {
                amount: 0.5,
                from: "start",
                grid: "auto",
            },
        }, "<+=1.5");

        tl.current.fromTo(".card-item", {
            x: -50,
            opacity: 0,
        }, {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.inOut",
            stagger: 0.25
        }, "<+=1")

        tl.current.fromTo(".timeline-item", {
            y: 100,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.inOut",
            stagger: {
                amount: 0.5,
                from: "start",
                grid: "auto",
            },
        }, "<+=1.5");

        tl.current.fromTo(".scroll-indicator", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.75,
            ease: "power3.inOut",
        }, "<+=0.5");

        tl.current.fromTo(".github-stats img", {
            scale: 0.95,
            opacity: 0,
        }, {
            scale: 1,
            opacity: 1,
            duration: 0.75,
            ease: "power3.inOut",
            stagger: 0.25,
        }, "<+=1");



        // cleanup
        return () => {
            tl.current.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }, [loaded]);


    // scroll triggers, etc for gsap
    useGSAP(() => {
        if(!loaded) return;

        const beachImage = document.querySelector(".about-image-beach") as HTMLImageElement;
        if(!beachImage) return;

        gsap.to(beachImage, {
            y: "-20%",
            ease: "none",
            scrollTrigger: {
                trigger: beachImage,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        })
    }, [loaded]);



    // loading page
    if(!loaded) {
        return (
            <HomePageLoader />
        )
    }

    // actual about page content
    return (
        <div className="main-content flex flex-col">
            { /* header stuff */ }
            <div className="header flex flex-col mt-10">
                <span className="bg-green-400 rounded-full w-fit mx-auto px-3 py-1 text-xs">• Available</span>
                <div className="mx-auto flex flex-row">
                    <h1 className="md:text-[3.35rem] text-[1.65rem] mt-1"><span className="text-red-400">Hello</span>, I&apos;m </h1>
                    <div className="about-text relative flex flex-col bg-white md:ml-5 ml-4 md:w-fit w-[150px]">
                        { /* svg for the text writing animation */}
                        <svg className="about-text-writeon absolute md:h-[45.8px] h-[23.5px] md:-left-[0.06rem] -left-[0.45rem] md:top-[1.55rem] top-[0.925rem] z-10 fill-none stroke-black md:stroke-[6px] stroke-[10px]" viewBox="0 0 365 58" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 0V54.5"/>
                            <path d="M19.5 6H3V30.5H10H15L19.5 30L24 28.5L27.5 25L30 21V17L29.5 13L27.5 9.5L24 7L19.5 6Z"/>
                            <path d="M19.5 30.5C19.5 30.9 29.1667 47.6667 34 56"/>
                            <path d="M61.5 20L55.5 18.5H53.5L49.5 19L46.5 21L43 25L40.1722 30L40 35L41.5 41L44 44.5L48 47.5L52 49.5H57L60.5 48.5L64 46L67.5 42.5L69.5 38.5L70 34L69.5 30L68 25.5L65 22.5L61.5 20Z"/>
                            <path d="M83 2V52"/>
                            <path d="M88.5 22L83 31V33.5V37L85.5 41.5L88.5 45.5L93 48L98 49.5H101.5L105.5 47.5L108.5 45L111 41.5L112.5 37V32L111.5 28L109.5 23.5L105.5 20.5L100.5 18.5H95.5L91.5 20L88.5 22Z"/>
                            <path d="M124.5 33H155"/>
                            <path d="M152 33L151 26.5L149 22.5L146 20L140 18L135 19L129.5 21L126.5 26.5L124.5 32L125 38L126 41.5L128 44.5L130.5 47L134.5 49L138.5 49.5L143.5 49L147 47L150 44L153 42"/>
                            <path d="M165 16V51.5"/>
                            <path d="M164.5 27L169 22L171 20L173.5 19L176.5 18.5H178.5H179.5"/>
                            <path d="M190.5 8.5V43L191.5 46L193.5 48L196 49H200.5H203"/>
                            <path d="M181 18H201.5" strokeWidth="8"/>
                            <path d="M217.5 5.5H251.5"/>
                            <path d="M248 5.5L216 52.5"/>
                            <path d="M218.5 48.5H252"/>
                            <path d="M260 2V52"/>
                            <path d="M260 24.5L265.5 20L269.5 19L273 18.5L275.5 19L278.5 20.5L280 22.5L281.5 25.5L282.5 28.5L283 32V52"/>
                            <path d="M296 26L299.5 21.5L302.5 19.5L306.5 18.5H310L313.5 19.5L316 21.5L318.5 25.5V29V52"/>
                            <path d="M307.5 33L316 31.5H318.5V40L314 46.5L311.5 48L308 49H304.5H301.5L298.5 48L297 46.5L296 44.5L295.5 42.5V40L297 37.5L300.5 34.5L307.5 33Z"/>
                            <path d="M342 19L347 18.5H349.5L353 19.5L356 21L358.5 23.5L361 27.5L361.5 32V37.5L359.5 42.5L355 47L349.5 49H343.5L339 47L336 44.5L334 41.5L333 39L332 35V31.5L333.5 27L335.5 23.5L339 20.5L342 19Z"/>
                        </svg>

                        { /* text cutout */ }
                        <div className="relative -left-2 md:top-4 top-2.5 w-fit z-20">
                            <svg className="w-full" viewBox="0 0 380 100">
                                <defs>
                                    <mask id="text-mask">
                                        <rect width="100%" height="100%" fill="white"/>
                                        <text className="md:text-[64px] text-[66px]" x="50%" y="40%" textAnchor="middle" dy=".35em" fontFamily="'Plus Jakarta Sans', sans-serif" fill="black">
                                            Robert Zhao
                                        </text>
                                    </mask>
                                </defs>
                                <rect width="100%" height="80%" fill="white" mask="url(#text-mask)" />
                            </svg>
                            <h1 className="sr-only">Robert Zhao</h1>
                        </div>
                    </div>
                </div>
                <span className="bg-zinc-200 rounded-full w-fit mx-auto px-3 py-1 text-xs">Student • Software Developer</span>
            </div>

            { /* cards */ }
            <div className="cards-container flex lg:flex-row flex-col justify-center mt-10 space-x-10 lg:space-y-0 space-y-20 mb-10">
                <InterestCard className="card lg:mx-0 lg:mr-10 mx-auto" />
                <ProgrammingTimeline className="card lg:mx-0 lg:mr-10 mx-auto" />
                <GithubStats className="card lg:mx-0 mx-auto" />
            </div>

            { /* about */ }
            <div className="w-fluid-lg mx-auto flex flex-col mt-20">
                <h1 className="text-md text-zinc-400 tracking-wide border-b-2 border-zinc-300 pb-3">ABOUT ME</h1>
                <div className="flex md:flex-row flex-col mt-10">
                    <div className="flex flex-col md:w-[70%] md:mr-10 w-full mr-0 md:text-[1.4rem] text-[1rem] md:indent-20 indent-10">
                        <p className="tracking-normal leading-15">Hello, I&apos;m Robert Zhao. I&apos;m currently a student at <Link className="underline text-red-400" href="https://www.tjhsst.edu/">TJHSST</Link> (Class of 2028) and I love technology. I&apos;m currently mostly a full-stack developer, but planning on exploring more into the backend, artificial intelligence, and machine learning.</p>
                        <p className="tracking-normal leading-15 mt-5">I started programming in 2018, and have been developing software ever since. I love the feeling of creating something from nothing, and seeing it come to life. I also love the challenge of solving complex problems, and finding the most efficient solution for them.</p>
                        <p className="tracking-normal leading-15 mt-5">In my free time, I usually enjoy playing video games, video editing, or photography. It&apos;s a great way to release stress from my day and express my inner creativity.</p>
                    </div>
                    <div className="flex flex-col md:w-1/4 w-full md:mx-0 md:my-auto mx-auto mt-10 relative overflow-hidden h-100">
                        <div className="absolute inset-0 bg-white z-0"></div>
                        <Image
                            src="/Beach.png"
                            alt="A picture of the site creator: Robert Zhao on the beach at sunset. The sky is a gradient of sky blue and a pinkish color. The sun setting on the right side of the image. Robert is facing towards the sea taking in the view."
                            width={453}
                            height={791}
                            className="about-image-beach absolute top-0 left-0 w-full h-[120%] object-cover"
                        />
                    </div>
                </div>
            </div>

            { /* current work */ }
            <div className="w-fluid-lg mx-auto flex flex-col mt-20">
                <h1 className="text-md text-zinc-400 tracking-wide border-b-2 border-zinc-300 pb-3">CURRENT WORK</h1>
                <div className="flex flex-col mt-10 md:indent-20 indent-10">
                    <p className="md:text-2xl text-[1rem] tracking-normal text-left leading-15">I&apos;m currently working on this portfolio, expanding into multiple areas of Next.js and exploring how to integrate GSAP and Framer together. I&apos;m also planning on working on a marble game in Java. Although I haven&apos;t started, I&apos;m designing how the gameplay will work.</p>
                </div>
            </div>

            { /* skills */ }
            <div className="w-fluid-lg mx-auto flex flex-col mt-20">
                <h1 className="text-md text-zinc-400 tracking-wide border-b-2 border-zinc-300 pb-3">SKILLS</h1>
                <SkillsSection sectionTitle="Operating Systems">
                    <OS operatingSystem="Windows" />
                    <OS operatingSystem="MacOS" specialize />
                </SkillsSection>
                <SkillsSection sectionTitle="Languages">
                    <Language language="Java" specialize />
                    <Language language="Python" specialize/>
                    <Language language="HTML" />
                    <Language language="CSS" />
                    <Language language="Tailwind" />
                    <Language language="Javascript" />
                    <Language language="Typescript" />
                </SkillsSection>
                <SkillsSection sectionTitle="Libraries & Frameworks">
                    <Framework framework="Next.js" specialize />
                    <Framework framework="SpigotMC" specialize />
                    <Framework framework="Electron.js" />
                    <Framework framework="Swing" />
                    <Library library="React" specialize />
                </SkillsSection>
            </div>

            { /* education */ }
            <div className="w-fluid-lg mx-auto flex flex-col mt-20">
                <h1 className="text-md text-zinc-400 tracking-wide border-b-2 border-zinc-300 pb-3">EDUCATION</h1>
                <div className="flex flex-col mt-10">
                    <div className="flex flex-col">
                        <p className="text-zinc-400">2024 - Present</p>
                        <p className="text-2xl tracking-normal leading-15 text-left"><span className="font-bold text-red-400">High School</span> - TJHSST (Class of 2028)</p>
                        <ul className="ml-19 text-lg list-disc">
                            <li>Foundations of Computer Science (Honors)</li>
                            <li>Research Statistics 1 (Honors)</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col mt-10">
                    <div className="flex flex-col">
                        <p className="text-zinc-400">2018 - Present</p>
                        <p className="text-2xl tracking-normal leading-15 text-left"><span className="font-bold text-red-400">Out of School</span> - Self Study</p>
                        <ul className="ml-19 text-lg list-disc">
                            <li>Python</li>
                            <li>Java/Type Script</li>
                            <li>React</li>
                            <li>Electron.js</li>
                            <li>Java</li>
                            <li>More!</li>
                        </ul>
                    </div>
                </div>
            </div>

            { /* contact */ }
            <div className="flex flex-col w-fluid-lg mx-auto mt-30">
                <h1 className="text-7xl mx-auto">Let&apos;s Talk!</h1>
                <p className="mx-auto mt-5">Shoot me an email! Note I will respond with my personal email.</p>
                <Link href="mailto:me@robertzhao.dev" className="flex flex-row mx-auto border-2 border-zinc-300 rounded-3xl mt-10 p-5 justify-center items-center">
                    <FiMail className="w-8 h-8 text-zinc-400 mt-1" />
                    <span className="text-xl ml-3">me@robertzhao.dev</span>
                </Link>
            </div>

            { /* footer */ }
            <Footer />
        </div>
    )
}