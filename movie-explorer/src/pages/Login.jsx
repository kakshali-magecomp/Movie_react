import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login()
{
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState({});//object creation
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();   
        let validationError={}
        const existeduser = localStorage.getItem("registeredUser");
        if(!existeduser){
            alert("user Not Found");
            return;
        }

        const saveduser = JSON.parse(existeduser);

        const emailRange = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(email != saveduser.email){
            validationError.email="Email Not Found";
        }else if(!emailRange.test(email)){
            validationError.email="Invalid Email Format";
        }

        if(password != saveduser.password){
            validationError.password="Password Not found";
        }else if(password.length<5){
            validationError.password="Password must be at least 5 character"
        }

        if(Object.keys(validationError).length>0){
            setError(validationError);
            return;
        }

        setError({});//resate Error
        // console.log(email);
        // console.log(password);
        alert("Login SuccessFully");
        localStorage.setItem("isLoggedIn", "true"); 
        localStorage.setItem("currentUserName", saveduser.name);
        navigate("/")
    }
    return(
        <div className="min-h-screen flex  justify-center bg-gray-900 px-5">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md mt-20 mb-20">
                <h1 className="text-white text-4xl font-bold mb-8 text-center">
                    Login
                </h1>
                <div className="mb-5">
                    <label className="text-gray-300 block mb-2">Email</label>
                    <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} 
                    className="w-full p-3 rounded-xl bg-gray-700 text-white outline-none"/>
                    <p className="text-red-500">{error.email}</p>
                </div>
                <div className="mb-6">
                    <label className="text-gray-300 block mb-2">Password</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} 
                    className="w-full p-3 rounded-xl bg-gray-700 text-white outline-none"/>
                    <p className="text-red-500">{error.password}</p>
                </div>
                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 text-white py-3 rounded-xl font-semibold">
                    Login
                </button>
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline font-semibold">
                    Register here
                    </Link>
                </p>
            </form>
        </div>
    )
}