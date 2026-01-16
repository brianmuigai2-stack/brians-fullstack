import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { podcastsApi } from "../api/podcasts";
import { categoriesApi } from "../api/categories";
import { favoritesApi } from "../api/favorites";
import { useAuth } from "../context/AuthContext";
import PodcastCard from "../components/PodcastCard";
import { Headphones, Globe, Users, Sparkles, Smartphone, Play } from "lucide-react";

// ... (Imports stay the same)

export default function Home() {
  // ... (Keep stats logic if you want to show numbers on landing page)

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#39FF14]/10 via-black to-black"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 text-[#39FF14] font-mono text-xs uppercase tracking-[0.2em] mb-4">
               <Sparkles size={14} /> The Future of Audio is Here
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black leading-none tracking-tighter text-white uppercase">
              WE TALK,<br />
              <span className="text-[#39FF14]">YOU LISTEN.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
              The world's most immersive podcast platform. High-fidelity sound meets boundary-pushing creators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link 
                to="/explore" 
                className="px-12 py-5 bg-[#39FF14] text-black font-black uppercase tracking-tighter rounded-full hover:scale-110 transition-all shadow-[0_0_30px_rgba(57,255,20,0.4)]"
              >
                Enter The Wave
              </Link>
              <Link 
                to="/register" 
                className="px-12 py-5 border-2 border-white text-white font-black uppercase tracking-tighter rounded-full hover:bg-white hover:text-black transition-all"
              >
                Join Studio
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Waveform Mockup */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-50 flex items-end gap-1 px-4">
           {[...Array(40)].map((_, i) => (
             <div key={i} className="flex-1 bg-[#39FF14]/20 rounded-t-full" style={{ height: `${Math.random() * 100}%` }}></div>
           ))}
        </div>
      </section>

      {/* Stats Section (Kept for landing page social proof) */}
      <section className="bg-[#050505] py-24 border-y border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Channels", val: "500+" },
              { label: "Global Listeners", val: "2.4M" },
              { label: "Daily Streams", val: "18K" },
              { label: "Audio Quality", val: "LOSSLESS" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <h3 className="text-4xl md:text-5xl font-black text-white group-hover:text-[#39FF14] transition-colors">{stat.val}</h3>
                <p className="text-gray-600 font-mono uppercase text-xs tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Section (Replaces the podcast grid on home) */}
      <section className="py-32 bg-black">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-10 bg-[#121212] border border-gray-800 rounded-[3rem] hover:border-[#39FF14]/50 transition-all">
                  <Headphones size={40} className="text-[#39FF14] mb-6" />
                  <h3 className="text-2xl font-black uppercase mb-4">Studio Quality</h3>
                  <p className="text-gray-500">Every wave is processed for maximum clarity. Experience audio as it was meant to be heard.</p>
               </div>
               <div className="p-10 bg-[#121212] border border-gray-800 rounded-[3rem] hover:border-[#39FF14]/50 transition-all">
                  <Globe size={40} className="text-[#39FF14] mb-6" />
                  <h3 className="text-2xl font-black uppercase mb-4">No Borders</h3>
                  <p className="text-gray-500">Connecting voices from Tokyo to New York. The wave travels everywhere you do.</p>
               </div>
               <div className="p-10 bg-[#121212] border border-gray-800 rounded-[3rem] hover:border-[#39FF14]/50 transition-all">
                  <Users size={40} className="text-[#39FF14] mb-6" />
                  <h3 className="text-2xl font-black uppercase mb-4">Creator First</h3>
                  <p className="text-gray-500">Built by artists for artists. Direct engagement and transparent analytics for every host.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Mobile App & Final CTA (Keep your existing mobile section here) */}
    </div>
  );
}