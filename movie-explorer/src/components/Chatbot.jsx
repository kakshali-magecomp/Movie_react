import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I am your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
  const ai = new GoogleGenAI({ apiKey: apiKey });


  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({ //Sends user message to Gemini AI.
        model: "gemini-2.5-flash",
        contents: input,
      });

      const botReply = response.text || "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Error connecting to AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="w-[350px] bg-gray-800 rounded-2xl shadow-lg p-5 font-sans border border-gray-700/50">
      <h3 className="text-center text-xl font-bold mb-4 text-white tracking-wide">
        AI Assistant
      </h3>
      
      <div className="h-[280px] overflow-y-auto p-3 mb-4 flex flex-col gap-3 rounded-xl bg-gray-900/60 border border-gray-700/30 scrollbar-thin">
        
        {messages.map((msg, index) => (
          <div  key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            
            <div className={`max-w-[80%] p-3 text-sm leading-relaxed shadow-md ${
                msg.role === "user" 
                  ? "bg-pink-500 text-white rounded-2xl rounded-tr-none" 
                  : "bg-gray-700 text-gray-200 rounded-2xl rounded-tl-none border border-gray-600/40"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 text-sm bg-gray-700 text-gray-400 rounded-2xl rounded-tl-none border border-gray-600/40 italic animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something..."
          className="flex-1 p-3 text-sm bg-gray-700 text-white rounded-xl outline-none border border-transparent focus:border-pink-500/50 transition-all placeholder-gray-400"
        />

        <button type="submit" disabled={loading} 
          className="bg-pink-500 hover:bg-pink-600 active:scale-95 transition-all duration-300 text-white px-4 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:pointer-events-none"
        >
          Send
        </button>
      </form>
    </div>
  );
}
