import { useState, useEffect, useMemo } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer"; 
import { Link, useNavigate } from "react-router-dom";

export default function Home({ setIsChatOpen, isChatOpen }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();
    
    // TRACK PAGINATION STATE
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 16;

    useEffect(() => {
        fetch("https://api.tvmaze.com/shows")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedCategory]);

    const trendingMovies = useMemo(()=>{
        return movies.slice(0,10);
    },[movies]);

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            const matchesSearch  = movie.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory === "All" ||
            (movie.genres && movie.genres.includes(selectedCategory));
            
            return matchesSearch && matchesCategory;
        });
    }, [movies, search, selectedCategory]);

    // PAGINATION CALCULATIONS
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    
    const paginatedMovies = useMemo(() => {
        const indexOfLastMovie = currentPage * moviesPerPage;
        const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
        return filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    }, [filteredMovies, currentPage]);

    if (loading) {
        return (
            <h1 className="text-white text-3xl p-10">Loading...</h1>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-x-hidden">
            
            <div className="p-10 flex-1">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                            Top 10 Trending
                        </h2>
                        <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-2 py-1 rounded-md ">
                            LIVE
                        </span>
                    </div>
                    
                    <div className="overflow-hidden w-full bg-gray-800/20 rounded-2xl border border-gray-700/30 p-4">
                        <div className="animate-scroll gap-6 py-2">
                            {[...trendingMovies, ...trendingMovies].map((movie, index) => {
                                const displayRank = (index % 10) + 1;

                                return (
                                    <Link to={`/movie/${movie.id}`} key={`${movie.id}-${index}`} className="w-48 group relative block min-w-[192px]">
                                        <div className="absolute -top-3 -left-3 z-10 font-black text-6xl text-gray-950 drop-shadow-[0_2px_2px_rgba(236,72,153,0.6)] group-hover:scale-110 transition-transform duration-300 select-none">
                                            #{displayRank}
                                        </div>
                                        
                                        <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-pink-500/50 transform group-hover:-translate-y-3 group-hover:rotate-1 transition-all duration-300 shadow-lg group-hover:shadow-pink-500/20">
                                            <div className="relative overflow-hidden aspect-[2/3]">
                                                <img src={movie.image?.medium || "https://placeholder.com"} alt={movie.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                                    <span className="text-xs bg-pink-500 px-2 py-0.5 rounded font-semibold">View Details</span>
                                                </div>
                                            </div>
                                            
                                            <div className="p-3">
                                                <h4 className="font-bold text-sm truncate group-hover:text-pink-400 transition-colors">
                                                    {movie.name}
                                                </h4>
                                                <p className="text-xs text-gray-400 mt-1">⭐ {movie.rating?.average || "N/A"}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
               
                <h1 className="text-white text-5xl font-bold mb-6">
                    Popular Movies
                </h1>

                <div className="flex flex-col gap-3 mb-10 bg-gray-800/40 p-5 rounded-2xl border border-gray-800/60 w-full">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-widest pl-1">
                        Filter by Categories
                    </label>
                    
                    <div className="flex flex-wrap gap-3">
                        {["All", "Drama", "Action", "Romance", "Thriller", "Comedy", "Crime", "Adventure", "Mystery", "Fantasy", "Supernatural"].map((genre) => {
                            const isActive = selectedCategory === genre;
                            return(
                                <button key={genre} type="button"  onClick={() => setSelectedCategory(genre)} className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border active:scale-95 shadow-md flex-grow sm:flex-grow-0 text-center ${
                                        isActive 
                                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent shadow-pink-500/20" 
                                            : "bg-gray-800 text-gray-200 border-gray-700/50 hover:border-pink-500/50"
                                    }`}> 
                                        {genre}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <SearchBar search={search} setSearch={setSearch} onChatToggle={() => setIsChatOpen(!isChatOpen)}/>
                
                {paginatedMovies.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {paginatedMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}></MovieCard>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gray-800/20 rounded-2xl border border-gray-800/40">
                        <p className="text-gray-400 text-lg">No movies match your active filter setup.</p>
                    </div>
                )} 

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12 mb-4">
                        <button disabled={currentPage === 1} onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 450, behavior: 'smooth' }); }}
                            className="bg-gray-800 hover:bg-pink-500 disabled:opacity-30 border border-gray-700 hover:border-transparent text-white px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:pointer-events-none"
                        >
                            Previous
                        </button>
                        
                        <div className="bg-gray-800 px-4 py-2 rounded-xl border border-gray-700 text-sm font-semibold">
                            Page <span className="text-pink-500">{currentPage}</span> of {totalPages}
                        </div>

                        <button disabled={currentPage === totalPages} onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 450, behavior: 'smooth' }); }}
                            className="bg-gray-800 hover:bg-pink-500 disabled:opacity-30 border border-gray-700 hover:border-transparent text-white px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:pointer-events-none"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
