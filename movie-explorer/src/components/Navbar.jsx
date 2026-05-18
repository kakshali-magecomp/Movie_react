import { Link, useNavigate } from "react-router-dom";

export default function Navbar()
{
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userName = localStorage.getItem("currentUserName");

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn"); // Remove the login flag
        localStorage.removeItem("currentUserName"); 
        alert("Logged out successfully");
        navigate("/login"); // Send them back to login page
    };

    return(
        <nav className="bg-black text-white p-5 flex justify-between items-center ">
            <div className="flex gap-3">
             <img src="./src/img/logo.png" className="w-[9%]"></img>
             <div className="grid">
            <h1 className="text-2xl font-bold">Movie Explore</h1>
            {isLoggedIn && (
                <span className="text-gray-300 font-medium mr-2 content-center">
                    Welcome , <strong className="text-white">{userName}</strong>
                </span>
            )}
            </div>
            </div>
            
            <div className="flex gap-5 items-center">
                
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                {/* <Link to="/Login">Login</Link> */}
                <div>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold">Logout</button>
                    ):(
                        <Link to="/Login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}