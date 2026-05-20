import { useRef } from "react";

export default function SearchBar({ search, setSearch, onChatToggle }) {
    const inputRef = useRef();
    
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
            <div className="relative flex-1 group">
                <div className="absolute -inset-0.5 rounded-2xl blur opacity-20 group-focus-within:opacity-50 group-hover:opacity-40 transition duration-500 "></div>
                
                <div className="relative flex items-center">
                    
                    <div className="absolute left-4 text-gray-500 group-focus-within:text-pink-500 transition-colors pointer-events-none">
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" />
                        </svg>
                    </div>

                    <input type="text" ref={inputRef} placeholder="Search Movie Here...." value={search} onChange={(e) => setSearch(e.target.value)}  
                        className="w-full p-4 pl-12 pr-14 rounded-2xl outline-none bg-gray-900/80 text-white placeholder-gray-500 border border-gray-800 focus:border-pink-500/50 backdrop-blur-md transition-all duration-300 text-sm tracking-wide shadow-2xl"
                    />
                    
                    <button type="button" onClick={onChatToggle} className="absolute right-3 p-2 text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 active:scale-90 rounded-xl transition-all duration-200" 
                        title="Ask AI Assistant"
                    >
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 drop-shadow-[0_0_8px_rgba(236,72,153,0)] hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.096.813ZM18.281 9l-.531 3.313L14.438 13l3.312.688L18.28 17l.532-3.312L22 13l-3.313-.688L18.281 9Z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* <button onClick={focusInput} 
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold text-white rounded-2xl group bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-500 hover:to-purple-600 focus:ring-2 focus:outline-none focus:ring-pink-800 transition-all duration-300 active:scale-95 shadow-lg shadow-pink-500/20 px-6 py-4 sm:py-0">
                <span className="relative transition-all ease-in duration-75 group-hover:bg-opacity-0">
                    Focus Input
                </span>
            </button> */}
        </div>
    );
}
