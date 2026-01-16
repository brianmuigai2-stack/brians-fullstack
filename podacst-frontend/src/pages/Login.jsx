import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Headphones, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans">
      {/* Wave Background Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="waves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 0 50 Q 25 25, 50 50 T 100 50 T 150 50 T 200 50" stroke="#39FF14" strokeWidth="1" fill="none" opacity="0.2"/>
            <path d="M 0 90 Q 25 65, 50 90 T 100 90 T 150 90 T 200 90" stroke="#39FF14" strokeWidth="1" fill="none" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Form */}
            <div className="bg-[#121212]/90 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-gray-800 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                    WELCOME BACK<span className="text-[#39FF14]">!</span>
                  </h1>
                  <p className="text-gray-400">
                    Don't have an account? <Link to="/register" className="text-[#39FF14] font-bold hover:underline">Sign up</Link>
                  </p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 ml-4">Username</label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-black border-2 border-[#39FF14]/30 rounded-full px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 ml-4">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black border-2 border-[#39FF14]/30 rounded-full px-6 py-4 pr-14 text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#39FF14] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm px-2">
                    <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-[#39FF14] bg-black text-[#39FF14] focus:ring-[#39FF14]"
                      />
                      Remember me
                    </label>
                    <Link to="/forgot-password" size="sm" className="text-gray-400 hover:text-[#39FF14]">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#39FF14] text-black font-black py-4 rounded-full hover:bg-[#2ee610] transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:scale-[1.02]"
                  >
                    SIGN IN
                  </button>
                </form>
              </div>
            </div>

            {/* Right Side - PodWave Branding */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-[480px] h-[480px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14] to-[#1a1a1a] rounded-full shadow-[0_0_60px_rgba(57,255,20,0.2)]"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
                  <Headphones className="w-32 h-32 mb-4 drop-shadow-md" />
                  <span className="text-4xl font-black tracking-tighter">PODWAVE</span>
                </div>

                {/* Vertical Social Stack */}
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                  {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-12 h-12 rounded-full bg-[#39FF14] flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg">
                      <Icon className="w-5 h-5 text-black" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}