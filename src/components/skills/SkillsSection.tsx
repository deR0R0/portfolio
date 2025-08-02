'use client';

export default function SkillsSection({ sectionTitle, children }: { sectionTitle: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col mt-10">
            <h1 className="text-3xl">{sectionTitle}</h1>
            <div className="flex flex-row flex-wrap mt-5 space-x-5 space-y-5">
                {children}
            </div>
        </div>
    )
}