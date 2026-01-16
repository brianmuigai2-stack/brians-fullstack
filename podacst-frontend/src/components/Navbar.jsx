import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Radio, LayoutGrid, Upload, Heart, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Helper to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black/95 backdrop-blur-md px-8 py-5 flex justify-between items-center border-b border-gray-900 sticky top-0 z-50">
      
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-[#39FF14] p-1 rounded-md group-hover:rotate-12 transition-transform duration-300">
          <Radio size={22} className="text-black" />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
          POD<span className="text-[#39FF14]">WAVE</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        
        {/* Explore - ALWAYS VISIBLE */}
        <Link 
          to="/explore" 
          className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
            isActive('/explore') ? 'text-[#39FF14]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <LayoutGrid size={16} /> Explore
        </Link>

        {user ? (
          <>
            <Link 
              to="/upload" 
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
                isActive('/upload') ? 'text-[#39FF14]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Upload size={16} /> Studio
            </Link>
            
            <Link 
              to="/favorites" 
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
                isActive('/favorites') ? 'text-[#39FF14]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart size={16} /> Library
            </Link>

            <div className="h-6 w-px bg-gray-800 mx-2"></div>

            <Link 
              to="/profile" 
              className={`flex items-center gap-3 group ${
                isActive('/profile') ? 'text-[#39FF14]' : 'text-gray-400'
              }`}
            >
              <div className="w-8 h-8 rounded-full border border-gray-700 overflow-hidden group-hover:border-[#39FF14] transition-all">
                {user.profile_photo ? (
                  <img src={user.profile_photo} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <User size={14} />
                  </div>
                )}
              </div>
              <span className="hidden lg:block text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors">
                {user.username}
              </span>
            </Link>

            <button 
              onClick={logout} 
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-[#39FF14] text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.15em] hover:scale-105 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)]"
            >
              Join Now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}