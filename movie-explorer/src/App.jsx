import { useState } from "react"; // 1. Import useState
import { Routes , Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login'
import Registration from "./pages/Registration";
import EditUser from "./pages/EditUser";
import Chatbot from "./components/Chatbot"; 

export default function App()
{
  //Controls chatbot visibility.
  const [isChatOpen, setIsChatOpen] = useState(false);

  return(
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Navbar/>
      
      <Routes>
          <Route path="/" element={<Home setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />} /> //allows home page to open close and check status
          <Route path="/about" element={<About/>}/>
          <Route path="/movie/:id" element={<MovieDetails/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/edituser" element={<EditUser/>}/>
      </Routes>

      {isChatOpen && (
        <div className="fixed bottom-5 right-5 z-50 shadow-2xl transition-all">
          <div className="flex justify-end bg-white px-3 pt-2 rounded-t-xl border border-b-0 border-gray-300">
            <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-red-500 text-xs font-bold">
              ✕ Close
            </button>
          </div>
          <Chatbot />
        </div>
      )}
    </div>
  )
}
