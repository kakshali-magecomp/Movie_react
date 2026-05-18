import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function EditUser()
{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email , setEmail] = useState("");
    const [phone , setPhone] = useState("");
    const [age , setAge] = useState("");
    const [error, setError] = useState({});

    useEffect(()=>{
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if(!isLoggedIn){
            alert("please Login First");
            navigate("/login");
            return;
        }
        const savedUserRow = localStorage.getItem("registeredUser");
        if(savedUserRow){
            const savedUser = JSON.parse(savedUserRow);
            setName(savedUser.name || "");
            setEmail(savedUser.email || "");
            setPhone(savedUser.phone || "");
            setAge(savedUser.age || "");
        }
    },[navigate]);

    function handleSubmit(e)
    {
        e.preventDefault();
        let validationError = {};

        if(!name.trim()){
            validationError.name="Require";
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
    }
}