import { NextResponse } from "next/server";

interface Repository {
    name: string;
    description: string;
    url: string;
    tags: string[];
    stars: number;
    updatedAt: string;
}

let lastSinceUpdated: number = Date.now() - 10 * 60 * 1000; // 10 minutes ago
let cachedRepoData: Repository[] = [];

const tags: Record<string, string[]> = {
    "portfolio": ["website", "typescript", "react", "nextjs", "tailwindcss", "gsap", "framer-motion", "open-source"],
    "SixStones": ["server-mod", "minecraft", "spigot", "bukkit", "plugin", "java", "maven", "yaml", "open-source"],
    "sssnac-time": ["game", "java", "swing", "graphics", "school", "open-source"],
    "isotope": ["bot", "discord", "python", "html", "oauth2", "discord.py", "sqlite", "json", "website", "open-source"],
    "SSTimer": ["application", "electron.js", "html", "css", "javascript", "json", "open-source"],
    "DiscordRPC": ["application", "python", "pypresence", "json", "open-source"],
    "login-page": ["website", "html", "css", "javascript", "python", "fullstack", "open-source"],
    "SimpleSmite": ["server-mod", "minecraft", "spigot", "bukkit", "plugin", "java", "maven", "open-source"],
    "SimpleFly": ["server-mod", "minecraft", "spigot", "bukkit", "plugin", "java", "maven", "yaml", "open-source"],
}

export async function GET(request: Request, context: { env: { GITHUB_KEY: string } }) {
    try {
        // we are fetching all repositories, then we're going to
        // extract the tags, determine if the repository is a project
        // to include the repository in the list of projects.
        // We also need to implement caching to avoid hitting the rate limit. We're updating every 10 minutes.

        // check if the last update was less than 10 minutes ago,
        // if it is, return the cached data
        if (Date.now() - lastSinceUpdated < 10 * 60 * 1000) {
            return NextResponse.json({ repositories: cachedRepoData, total: cachedRepoData.length, lastUpdated: lastSinceUpdated });
        }

        // isn't? update the information
        const response = await fetch("https://api.github.com/users/deR0R0/repos?sort=updated&per_page=100", {
            headers: {
                Authorization: `Bearer ${context.env.GITHUB_KEY}`
            }
        });

        if(!response.ok) {
            return NextResponse.json({ error: "Failed to fetch data from GitHub API" }, { status: response.status });
        }

        const repositories = await response.json();
        const repoData: Repository[] = [];

        // for each repository, we will check if it has a README file
        for(const repository of repositories) {
            if(repository.fork) {
                console.debug(`Skipping forked repository ${repository.name}`);
                continue;
            }

            let tagsList = tags[repository.name];

            // didn't manually set a tag? return no tags
            if(tags[repository.name] === undefined) {
                tagsList = ["unknown"];
            }

            repoData.push({
                name: repository.name,
                description: repository.description || "No description provided",
                url: repository.html_url,
                tags: tagsList,
                stars: repository.stargazers_count,
                updatedAt: repository.updated_at,
            });
        }

        cachedRepoData = repoData; // cache the data
        lastSinceUpdated = Date.now(); // update the last updated time

        // return all repositories information
        return NextResponse.json({
            repositories: repoData,
            total: repositories.length,
            lastUpdated: lastSinceUpdated
        });
    } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
        return NextResponse.json({ error: "Failed to fetch data from GitHub API" }, { status: 500 });
    }
}