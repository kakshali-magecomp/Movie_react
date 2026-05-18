import { Routes , Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login'
import Registration from "./pages/Registration";

export default function App()
{
  return(
    <div>
      <Navbar/>
      <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/movie/:id" element={<MovieDetails/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>

      </Routes>
    </div>
  )
}