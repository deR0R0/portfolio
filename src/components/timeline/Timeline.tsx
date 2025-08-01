'use client';

import TimelineItem from "./TimelineItem";

export default function Timeline() {
    return (
        <div className="timeline flex flex-col">
            <TimelineItem type="server" title="Learned DNS" description="Through Cloudflare documentation, I learned about DNS and how it works. I used this knowledge to setup my domain on Cloudflare and use Cloudflare workers to host my site." date="6/30/2024 - 8/20/2025" />
            <TimelineItem type="programming" title="Learned Next.js" description="I learned Next.js, React, and TypeScript, and used the documentation over the summer to build this portfolio site." date="6/30/2024 - 8/20/2025" />
            <TimelineItem type="education" title="Learned Java & OOP" description="I learned Java and object-oriented programming concepts through TJHSST's Foundations of Computer Science course." date="8/??/2024 - 6/??/2025" />
            <TimelineItem type="start" title="Started My Journey" description="I started this journey (which is programming) when I was introduced to Python and HTML through Fairfax Collegiate's summer Intro to Programming course at 9 years old." date="2017 ~ 2018" />
        </div>
    )
}