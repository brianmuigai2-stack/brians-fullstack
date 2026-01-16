import { FileText, Scale, AlertCircle, Ban, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-black pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#39FF14]/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#39FF14] transition-colors mb-8 font-mono uppercase text-xs tracking-widest">
            <ArrowLeft size={16} /> Return to Studio
          </Link>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
            Terms of <span className="text-[#39FF14]">Service</span>
          </h1>
          <div className="flex justify-center items-center gap-4">
            <div className="h-px w-12 bg-gray-800"></div>
            <p className="text-gray-500 font-mono uppercase tracking-widest text-xs">
              Protocol version: {new Date().toLocaleDateString()}
            </p>
            <div className="h-px w-12 bg-gray-800"></div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 gap-6">
          
          {/* Acceptance Card */}
          <div className="bg-[#121212] border border-gray-800 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start hover:border-[#39FF14]/40 transition-colors">
            <div className="bg-white text-black p-4 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Scale size={28} />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#39FF14]">Acceptance of Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                By accessing and using <span className="text-white font-bold tracking-tight">PodWave</span>, 
                you accept and agree to be bound by these Terms of Service. This is a digital agreement 
                between you and the PodWave platform.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Accounts */}
            <div className="bg-[#121212] border border-gray-800 p-8 rounded-[2.5rem] space-y-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-900 rounded-xl text-[#39FF14]">
                <FileText size={24} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">User Accounts</h2>
              <ul className="space-y-3">
                {[
                  "Must be at least 13 years old",
                  "Account security is your responsibility",
                  "No illegal usage permitted"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-1 h-1 bg-[#39FF14] rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Termination */}
            <div className="bg-[#121212] border border-gray-800 p-8 rounded-[2.5rem] space-y-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-900 rounded-xl text-red-500">
                <Ban size={24} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Termination</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We reserve the right to terminate or suspend accounts that violate these terms 
                without prior notice. Your access to the "Wave" is a privilege maintained by 
                following community standards.
              </p>
            </div>
          </div>

          {/* Content Guidelines - The Big Card */}
          <div className="bg-[#121212] border border-gray-800 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <AlertCircle size={120} className="text-[#39FF14]" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                Content <span className="text-[#39FF14]">Guidelines</span>
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Creators own their voice. However, you must ensure you own the rights to the content 
                you stream. Prohibited content triggers automatic wave termination:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Copyright", desc: "No unauthorized material" },
                  { label: "Conduct", desc: "No hate speech or bias" },
                  { label: "Safety", desc: "No illegal/harmful files" }
                ].map((item, i) => (
                  <div key={i} className="bg-black/50 border border-gray-800 p-6 rounded-3xl">
                    <h3 className="text-[#39FF14] font-black text-sm uppercase mb-1">{item.label}</h3>
                    <p className="text-xs text-gray-600 font-mono">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Decoration */}
      <div className="mt-20 text-center">
        <p className="text-gray-800 font-black text-8xl md:text-[12rem] leading-none select-none">
          PODWAVE
        </p>
      </div>
    </div>
  );
}