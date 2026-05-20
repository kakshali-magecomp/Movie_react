import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userName = localStorage.getItem("currentUserName");

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUserName"); 
        alert("Logged out successfully");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60 text-white px-6 py-4 flex justify-between items-center shadow-xl shadow-black/20">
            
            <div className="flex gap-4 items-center">
                <div className="relative group cursor-pointer" onClick={() => navigate("/")}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                    <img src="./img/logo.png" className="relative w-10 h-10 object-contain rounded-lg" alt="logo" />
                </div>

                <div className="flex flex-col justify-center">
                    <h1 onClick={() => navigate("/")} className="text-xl sm:text-2xl font-black tracking-tight cursor-pointer bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent hover:to-pink-400 transition-all duration-300">
                        Movie<span className="text-pink-500 font-extrabold">Explore</span>
                    </h1>
                    
                    {isLoggedIn && (
                        <div className="flex items-center gap-2 mt-0.5 bg-gray-900/80 px-2 py-0.5 rounded-md border border-gray-800/50 w-fit">
                            <span className="text-gray-400 text-[11px] font-medium">
                                Welcome, <strong className="text-pink-400 font-semibold">{userName}</strong>
                            </span>
                            <span className="text-gray-600 text-xs">|</span>
                            <Link to="/edituser" className="text-[10px] uppercase font-bold tracking-wider text-gray-400 hover:text-white transition-colors duration-200" title="Edit Profile">
                                Edit ✏️
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            
            
            <div className="flex gap-6 items-center font-medium text-sm">
                <Link to="/" className="text-gray-300 hover:text-white relative group py-1 transition-colors">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
                
                <Link to="/about" className="text-gray-300 hover:text-white relative group py-1 transition-colors">
                    About
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
                
                
                <div>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-500 border border-red-500/30 hover:border-red-500 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-lg shadow-red-500/5">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold uppercase tracking-wider text-white rounded-xl group bg-gradient-to-br from-pink-500 to-purple-600 group-hover:from-pink-500 group-hover:to-purple-600 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-pink-800 transition-all duration-300 active:scale-95 shadow-lg shadow-pink-500/20">
                            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-gray-950 rounded-[10px] group-hover:bg-opacity-0">
                                Login
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
