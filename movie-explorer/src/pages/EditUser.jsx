import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditUser() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState({});
    
    // We keep track of the original email to know which user profile we are editing
    const [originalEmail, setOriginalEmail] = useState("");

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        const currentUserName = localStorage.getItem("currentUserName");
        const userList = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const activeUser = userList.find(user => user.name === currentUserName);

        if (activeUser) {
            setName(activeUser.name || "");
            setEmail(activeUser.email || "");
            setPhone(activeUser.phone || "");
            setAge(activeUser.age || "");
            setOriginalEmail(activeUser.email || ""); // Save this as our search anchor
        } else {
            alert("User profile not found!");
            navigate("/login");
        }
    }, [navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        let validationError = {};

        if (!name.trim()) {
            validationError.name = "Name is required";
        }

        const emailRange = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!email) {
            validationError.email = "Email is required";
        } else if (!emailRange.test(email)) {
            validationError.email = "Invalid Email Format";
        }

        const phoneRegex = /^[0-9]\d{9}$/;
        if (!phone) {
            validationError.phone = "Phone number is Required";
        } else if (phone.length !== 10) {
            validationError.phone = "Phone number must be exactly 10 digits";
        } else if (!phoneRegex.test(phone)) {
            validationError.phone = "Must be in digit format";
        }

        if (!age) {
            validationError.age = "Age is required";
        }

        if (Object.keys(validationError).length > 0) {
            setError(validationError);
            return;
        }

        setError({}); //Removes previous errors
        const userList = JSON.parse(localStorage.getItem("registeredUsers")) || [];

        //some is javaScript array method used to check atlist one item matches a condition
        const emailTaken = userList.some(user => user.email === email && user.email !== originalEmail);
        
        if (emailTaken) {
            setError({ email: "This email is already taken by another account!" });
            return;
        }

        const updatedUsersList = userList.map((user) => {
            if (user.email === originalEmail) {
                return { ...user, name, email, phone, age };
            }
            return user; // Leave other users unchanged
        });

        localStorage.setItem("registeredUsers", JSON.stringify(updatedUsersList));
        localStorage.setItem("currentUserName", name); 

        alert("Profile Updated Successfully!");
        navigate("/");
    }

    return (
        <div className="min-h-screen flex justify-center bg-gray-900 px-5 text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md mt-10 mb-10 h-fit">
                <h1 className="text-4xl font-bold mb-6 text-center">Edit Profile</h1>
                
                <div className="mb-4">
                    <label className="text-gray-300 block mb-1.5 text-sm">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-xl bg-gray-700 outline-none focus:ring-1 focus:ring-pink-50" />
                    <p className="text-red-500 text-xs mt-1">{error.name}</p>
                </div>

                <div className="mb-4">
                    <label className="text-gray-300 block mb-1.5 text-sm">Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-xl bg-gray-700 outline-none" />
                    <p className="text-red-500 text-xs mt-1">{error.email}</p>
                </div>

                <div className="mb-4">
                    <label className="text-gray-300 block mb-1.5 text-sm">Phone Number</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 rounded-xl bg-gray-700 outline-none" />
                    <p className="text-red-500 text-xs mt-1">{error.phone}</p>
                </div>

                <div className="mb-6">
                    <label className="text-gray-300 block mb-1.5 text-sm">Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 rounded-xl bg-gray-700 outline-none" />
                    <p className="text-red-500 text-xs mt-1">{error.age}</p>
                </div>

                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 py-3 rounded-xl font-semibold transition-all">
                    Save Changes
                </button>
            </form>
        </div>
    );
}
