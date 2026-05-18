import { Link, } from "react-router-dom";

export default function MovieCard({movie,})
{
    return(
        <Link to={`/movie/${movie.id}`}>
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300">
                <img src={movie.image?.medium} alt={movie.name} className="w-full h-[350px] object-cover"></img>
                <div className="p-4">
                    <h2 className="text-white text-xl font-bold mb-2">
                        {movie.name}
                    </h2>
                    <p className="text-gray-400">
                        Rating:{" "}{movie.rating?.average || "N/A"}
                    </p>
                </div>
            </div>
        </Link>
    )
}