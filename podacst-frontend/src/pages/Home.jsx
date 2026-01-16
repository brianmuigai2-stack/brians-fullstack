import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { podcastsApi } from "../api/podcasts";
import { categoriesApi } from "../api/categories";
import { useAuth } from "../context/AuthContext"; // Ensure this is imported
import { 
  Headphones, Globe, Users, Sparkles, Smartphone, 
  Play, Radio, ChevronRight, Zap, ShieldCheck, Trophy 
} from "lucide-react";

export default function Home() {
  const { user } = useAuth(); // Destructure user to check auth status
  const [podcasts, setPodcasts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    podcastsApi.getAll().then(setPodcasts).catch(console.error);
    categoriesApi.getAll().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#39FF14] selection:text-black">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow"
            alt="Studio Background"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14] font-mono text-[10px] uppercase tracking-[0.3em] mb-8 animate-bounce-subtle">
             <Zap size={12} fill="#39FF14" /> Now Spatial Audio Enabled
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black leading-[0.85] tracking-[-0.05em] uppercase mb-8">
            OWN THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] via-white to-[#39FF14] bg-[length:200%_auto] animate-gradient-x">
              FREQUENCY.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            The elite destination for high-fidelity spoken word. <span className="text-white font-medium">No ads. No fluff. Just the Wave.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/explore" 
              className="group px-10 py-5 bg-[#39FF14] text-black font-black uppercase tracking-tighter rounded-full hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(57,255,20,0.3)]"
            >
              Start Listening <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* LOGIC: Redirect to Upload if logged in, otherwise Register */}
            <Link 
              to={user ? "/upload" : "/register"} 
              className="px-10 py-5 border border-gray-700 bg-white/5 backdrop-blur-md text-white font-black uppercase tracking-tighter rounded-full hover:bg-white hover:text-black transition-all"
            >
              {user ? "Open Studio" : "Create Channel"}
            </Link>
          </div>
        </div>
      </section>

      {/* --- BRAND SCROLLER --- */}
      <div className="py-12 bg-black border-b border-gray-900 overflow-hidden">
        <p className="text-center text-gray-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-8">Trusted by industry leaders</p>
        <div className="flex justify-around items-center opacity-30 grayscale hover:grayscale-0 transition-all gap-8 flex-wrap container mx-auto px-4">
          <span className="text-2xl font-black italic">TECHCRUNCH</span>
          <span className="text-2xl font-black italic">WIRED</span>
          <span className="text-2xl font-black italic">THE VERGE</span>
          <span className="text-2xl font-black italic">FORBES</span>
          <span className="text-2xl font-black italic">SPOTIFY</span>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-gray-900 border border-gray-900 rounded-[3rem] overflow-hidden">
            {[
              { label: "Stream Quality", val: "24-bit", sub: "Lossless Audio" },
              { label: "Community", val: "2.4M+", sub: "Monthly Listeners" },
              { label: "Global Reach", val: "180+", sub: "Countries Live" }
            ].map((stat, i) => (
              <div key={i} className="bg-black p-16 text-center hover:bg-[#050505] transition-colors group">
                <h3 className="text-6xl font-black text-white mb-2 group-hover:text-[#39FF14] transition-colors">{stat.val}</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
                <p className="text-gray-600 font-mono text-[10px] mt-2 uppercase">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUE PROPS --- */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Engineered for <br />
              <span className="text-[#39FF14]">The Modern Listener.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap />, title: "Instant Sync", desc: "Start on your phone, finish on your desktop. Zero lag." },
              { icon: <ShieldCheck />, title: "Privacy First", desc: "No tracking. No data selling. Just pure audio bliss." },
              { icon: <Trophy />, title: "Rewards", desc: "Earn tokens by supporting your favorite underground creators." },
              { icon: <Smartphone />, title: "Offline Mode", desc: "Crystal clear audio, even in the dead zones." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-[#0A0A0A] border border-gray-800 hover:border-[#39FF14]/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center text-[#39FF14] mb-6 group-hover:bg-[#39FF14] group-hover:text-black transition-all">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-black uppercase mb-3">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#39FF14]/20 rounded-full blur-[160px] opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none mb-12">
              STOP BROWSING. <br />
              START <span className="italic underline decoration-[#39FF14]">HEARING.</span>
            </h2>

            {/* LOGIC: Redirect to Explore if logged in, otherwise Register */}
            <Link 
              to={user ? "/explore" : "/register"} 
              className="inline-block px-16 py-6 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-[#39FF14] transition-all transform hover:scale-110 shadow-2xl"
            >
              {user ? "Browse Elite Content" : "Get PodWave Elite — Free"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}