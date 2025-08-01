'use client';

export function InterestsCardItem({ title, color, children } : { title: string, color: string, children?: React.ReactNode }) {
    return (
        <div className="card-item flex flex-row w-[95%] mx-auto mt-5 shadow-[0px_0px_25px_-5px_rgba(0,_0,_0,_0.15)] border-[2px] border-[#F1F1F1] rounded-2xl">
            <div className="p-2 flex flex-row items-center justify-center">
                <div className={`w-1 h-[95%] rounded-full ${color} mr-2`} />
                {children}
                <h1 className="text-2xl ml-2">{title}</h1>
            </div>
        </div>
    );
}