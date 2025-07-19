'use client';

import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

export default function About() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // send a custom event to the window
        const handleOnLoad = () => {
            setLoaded(true);
            window.dispatchEvent(new Event("ready-for-entry"));
        }

        if (document.readyState === "complete") {
            handleOnLoad();
        } else {
            window.addEventListener("load", handleOnLoad);
            return () => window.removeEventListener("load", handleOnLoad);
        }
    }, []);

    if(!loaded) {
        return (
            <p>Loading</p>
        )
    }

    return (
        <div className="main-content">
            <p>Hello, You're on the about page!</p>
        </div>
    )
}