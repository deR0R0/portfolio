import Link from "next/link";

export default function TechStackItem({language, link, path, viewBox = "400"}: {language: string, link: string, path: string, viewBox?: string}) {
    return (
        <div className={`tech-stack-item tech-stack-item-${language}`}>
            <Link href={link} target="_blank" rel="noopener noreferrer">
                <svg className="tech-stack-item-image min-w-20 min-h-20 fill-zinc-800" xmlns="http://www.w3.org/2000/svg" viewBox={`0, 0, ${viewBox},${viewBox}`}>
                    <path d={path} />
                </svg>
            </Link>
        </div>
    )
}