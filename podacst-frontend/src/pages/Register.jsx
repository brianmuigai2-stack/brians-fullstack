import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Headphones, User, Mail, Lock, AudioLines } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", full_name: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans">
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="url(#waves)" />
        <defs>
          <pattern id="waves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 0 50 Q 25 25, 50 50 T 100 50" stroke="#39FF14" strokeWidth="1" fill="none" opacity="0.2"/>
          </pattern>
        </defs>
      </svg>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Registration Form */}
            <div className="bg-[#121212]/90 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-gray-800 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                    JOIN THE WAVE<span className="text-[#39FF14]">.</span>
                  </h1>
                  <p className="text-gray-400">
                    Already a member? <Link to="/login" className="text-[#39FF14] font-bold hover:underline">Log in</Link>
                  </p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      className="w-full bg-black border-2 border-[#39FF14]/30 rounded-full px-6 py-4 text-white placeholder-gray-600 focus:border-[#39FF14] transition-all outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full bg-black border-2 border-[#39FF14]/30 rounded-full px-6 py-4 text-white placeholder-gray-600 focus:border-[#39FF14] transition-all outline-none"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black border-2 border-[#39FF14]/30 rounded-full px-6 py-4 text-white placeholder-gray-600 focus:border-[#39FF14] transition-all outline-none"
                    required
                  />

                  <input
                    type="password"
                    placeholder="Create Password"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-black border-2 border-[#39FF14]/30 rounded-full px-6 py-4 text-white placeholder-gray-600 focus:border-[#39FF14] transition-all outline-none"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#39FF14] text-black font-black py-4 rounded-full hover:bg-[#2ee610] transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] mt-2 hover:scale-[1.02]"
                  >
                    CREATE ACCOUNT
                  </button>
                </form>
              </div>
            </div>

            {/* Right Side - Branding Overlay */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-[480px] h-[480px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14] to-blue-600 rounded-full blur-[2px] opacity-80"></div>
                <div className="absolute inset-4 bg-black rounded-full flex flex-col items-center justify-center border border-white/10">
                  <AudioLines className="w-32 h-32 text-[#39FF14] mb-4" />
                  <span className="text-white text-3xl font-black tracking-widest">JOIN PODWAVE</span>
                  <p className="text-gray-500 mt-2 text-center px-20 text-sm">Experience the next generation of audio storytelling.</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}