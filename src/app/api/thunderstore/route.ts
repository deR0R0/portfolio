import { NextResponse } from "next/server";

export async function GET() {
    try {
        // create request
        const response = await fetch("https://thunderstore.io/api/v1/package-metrics/RoroMods/CaliforniaBoombox");

        // check if response is ok
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch data from Thunderstore API" }, { status: response.status });
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        // log the error
        console.error(error);

        // return a 500 response with an error message
        return NextResponse.json(
            { error: "Failed to fetch data from Thunderstore API" },
            { status: 500 }
        );
    }
}