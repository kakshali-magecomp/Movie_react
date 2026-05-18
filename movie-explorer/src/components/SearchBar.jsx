import { useRef, } from "react";

export default function SearchBar({search,setSearch})
{
    const inputRef = useRef();
    function focusInput()
    {
        inputRef.current.focus();
    }
    return(
        <div className="flex gap-3 mb-8">
            <input type="text" ref={inputRef} placeholder="Search Movie Here...." value={search} onChange={(e)=>setSearch(e.target.value)}  
            className="flex-1 p-3 rounded-xl outline-none bg-gray-800 text-white"></input>
            <button onClick={focusInput} className="bg-pink-500 px-5 rounded-xl text-white">Focus</button>
        </div>
    )
}