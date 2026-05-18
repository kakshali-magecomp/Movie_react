import { useState,useEffect,useMemo } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function Home()
{
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    useEffect(()=>{
        fetch("https://api.tvmaze.com/shows")
        .then((response) =>
            response.json()
        )
        .then((data) => {
            setMovies(data);
            setLoading(false);
        });
    },[]);

    const filteredMovies =
        useMemo(()=>{
            return movies.filter((movies)=>
            movies.name
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )
        );
        },[movies,search]);

        if(loading){
            return(
                <h1 className="text-white text-3xl p-10">Loading...</h1>
            );
        }
        return(
            <div className="p-10">
                <h1 className="text-white text-5xl font-bold  mb-8">
                    Populer Movies
                </h1>
                <SearchBar search={search} setSearch={setSearch}/>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMovies.map((movies)=>(
                        <MovieCard key={movies.id} movie={movies}></MovieCard>
                    ))}
                </div>
            </div>
        );
}