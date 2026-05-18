import { Link } from "react-router-dom";

export default function Navbar()
{
    return(
        <nav className="bg-black text-white p-5 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Movie Explore</h1>
            <div className="flex gap-5">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    )
}