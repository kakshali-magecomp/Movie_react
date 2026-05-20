import React from "react";

export default function About() {
    
    const techStack = [
        { name: "React Router", desc: "Manages seamless multi-page user navigation.", icon: "🛣️" },
        { name: "React Hooks", desc: "Handles responsive states, effects, and memoized lists.", icon: "⚓" },
        { name: "API Fetching", desc: "Integrates asynchronous data dynamically from TVMaze.", icon: "📡" },
        { name: "Tailwind CSS", desc: "Styles the interface using modern utility classes.", icon: "🎨" }
    ];

    
    const coreFeatures = [
        "Secure User Registration & Login via browser LocalStorage array handling.",
        "Dynamic content lookups matching string search queries instantly.",
        "Infinite auto-scrolling Top 10 Trending showcase marquee list track.",
        "Advanced interactive category filters mapping structural API data items.",
        "Vite-safe environment variable obfuscation for secure API key handling."
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-10 flex flex-col justify-center items-center">
            <div className="bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-700/50 max-w-4xl w-full">
                
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                        About Us
                    </h1>
                    <div className="h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
                </div>

                <p className="text-base sm:text-lg text-gray-300 text-center leading-relaxed mb-12 max-w-2xl mx-auto">
                    Welcome to <strong className="text-white">Movie Explore</strong>, a production-grade single-page prototype engineered to deliver clean cataloging interfaces, interactive components, and real-time data pipelines.
                </p>

                <div className="mb-12">
                    <h3 className="text-xl font-bold text-pink-400 mb-6 uppercase tracking-wider border-b border-gray-700/50 pb-2">
                        Core Architecture
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {techStack.map((tech) => (
                            <div key={tech.name} className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/30 hover:border-pink-500/30 transition-all duration-300 group hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300 select-none">
                                        {tech.icon}
                                    </span>
                                    <h4 className="font-bold text-base text-white group-hover:text-pink-400 transition-colors">
                                        {tech.name}
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-400 leading-normal pl-9">
                                    {tech.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-5 uppercase tracking-wider border-b border-gray-700/50 pb-2">
                        Engineered Features
                    </h3>
                    <ul className="space-y-3 pl-1">
                        {coreFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                                <span className="text-pink-500 mt-1 font-bold">✓</span>
                                <p className="leading-relaxed">{feature}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
