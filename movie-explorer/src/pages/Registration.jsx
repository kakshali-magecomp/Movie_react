import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration()
{
    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const[error, setError] = useState({});//object creation
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();   
        let validationError={}

        if(!name){
            validationError.name="name is Required";
        }else if(name.length<3){
            validationError.name="Name must be at lest 3 character";
        }

        const emailRange = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(!email){
            validationError.email="Email is required";
        }else if(!emailRange.test(email)){
            validationError.email="Invalid Email Format";
        }

        const phoneRegex = /^[0-9]\d{9}$/;
        if(!phone){
            validationError.phone="phone number is Required";
        }else if(!password.length>10){
            validationError.phone="Incorrect Phone Number";
        }else if(!phoneRegex.test(phone)){
            validationError.phone="Must be In digit formate";
        }

        if(!age){
            validationError.age="Age is required";
        }

        if(!password){
            validationError.password="Password is Required";
        }else if(password.length<5){
            validationError.password="Password must be at least 5 character";
        }

        if(Object.keys(validationError).length>0){
            setError(validationError);
            return;
        }

        setError({});//resate Error
        // console.log(name);
        // console.log(email);
        // console.log(password);
        const userData = {name, email, password, phone, age };
        localStorage.setItem("registeredUser", JSON.stringify(userData));
        alert("Register SuccessFully");
        navigate("/login")
    }

    return(
        <div className="min-h-screen flex  justify-center bg-gray-900 px-5">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md mt-20 mb-20">
                <h1 className="text-white text-4xl font-bold mb-8 text-center">
                    Registration
                </h1>

                <div className="mb-5">
                    <label className="text-gray-300 block mb-2">Name</label>
                    <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} 
                    className="w-full p-3 rounded-xl bg-gray-700 text-white outline-none"/>
                    <p className="text-red-500">{error.name}</p>
                </div>

                <div className="mb-5">
                    <label className="text-gray-300 block mb-2">Email</label>
                    <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} 
                    className="w-full p-3 rounded-xl bg-gray-700 text-white outline-none"/>
                    <p className="text-red-500">{error.email}</p>
                </div>

                <div className="mb-5">
                    <label className="text-gray-300 block mb-2">Phone</label>
                    <input type="text" placeholder="Enter Phone No" value={phone} onChange={(e)=>setPhone(e.target.value)} 
                    className="w-full p-3 rounded-xl bg-gray-700 text-white outline-none"/>
                    <p className="text-red-500">{error.phone}</p>
                </div>

                <div className="mb-5">
                    <label className="text-gray-300 block mb-2">Age</label>
                    <input type="number" placeholder="Enter Age" value={age} onChange={(e)=>setAge(e.target.value)} 
                    className="w-full p-3 rounded-xl bg-gray-700 text-white outline-none"/>
                    <p className="text-red-500">{error.age}</p>
                </div>

                <div className="mb-6">
                    <label className="text-gray-300 block mb-2">Password</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} 
                    className="w-full p-3 rounded-xl bg-gray-700 text-white outline-none"/>
                    <p className="text-red-500">{error.password}</p>
                </div>

                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 text-white py-3 rounded-xl font-semibold">
                    Register
                </button>
            </form>
        </div>
    )
}