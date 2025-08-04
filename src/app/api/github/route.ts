import { NextResponse } from "next/server";

export async function GET() {
    let lastSinceUpdated: number = new Date(Date.now() - 10 * 60 * 1000).getMilliseconds(); // 10 minutes ago
    const repoData: any[] = [];

    try {
        // we are fetching all repositories, then we're going to
        // go into the readme and try to find the header "TAGS"
        // extract the tags, determine if the repository is a project
        // to include the repository in the list of projects.
        // We also need to implement caching to avoid hitting the rate limit. We're updating every 10 minutes.

        // check if the last update was less than 10 minutes ago
        if (lastSinceUpdated > Date.now()) {
            return NextResponse.json({ repositories: repoData, total: repoData.length, lastUpdated: lastSinceUpdated });
        }

        // isn't? update the information
        const response = await fetch("https://api.github.com/users/deR0R0/repos?sort=updated&per_page=100");

        if(!response.ok) {
            return NextResponse.json({ error: "Failed to fetch data from GitHub API" }, { status: response.status });
        }

        const repositories = await response.json();

        // for each repository, we will check if it has a README file
        let times = 0;
        repositories.forEach(async (repository: { name: string, html_url: string, stargazers_count: number, updated_at: string }) => {
            times++;

            if(times > 3) {
                return; // limit the number of requests to avoid hitting the rate limit
            }


            const repoReadme = await fetch(`https://api.github.com/repos/deR0R0/${repository.name}/readme`, {
                headers: {
                    "Accept": "application/vnd.github.v3.raw"
                }
            });

            if(repoReadme.status === 404) {
                console.warn("README not found for", repository.name);
                return;
            }

            if(!repoReadme.ok) {
                console.log(repoReadme.status, repoReadme.statusText);
                console.error(`Failed to fetch README for ${repository.name}`);
                return;
            }

            const text = await repoReadme.text();

            if(!text.includes("# TAGS")) {
                console.warn(`No tags found in README for ${repository.name}`);
                return;
            }

            // if there are tags, read the line after "# TAGS" and split by commas
            const tags = [];
            const lines = text.split("\n");
            for(let i = 0; i < lines.length; i++) {
                if(lines[i].includes("# TAGS")) {
                    if(i + 1 < lines.length) {
                        tags.push(...lines[i + 1].split(",").map(tag => tag.trim()));
                    }
                    break;
                }
            }

            repoData.push({ name: repository.name, url: repository.html_url, stars: repository.stargazers_count, updatedAt: repository.updated_at, readme: text });
        });

        lastSinceUpdated = new Date(Date.now()).getMilliseconds(); // update the last updated time

        // return all repositories information
        return NextResponse.json({
            repositories: await Promise.all(repoData),
            total: repositories.length,
            lastUpdated: lastSinceUpdated
        });
    } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
        return NextResponse.json({ error: "Failed to fetch data from GitHub API" }, { status: 500 });
    }
}