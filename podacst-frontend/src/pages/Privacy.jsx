import { Shield, Lock, Eye, UserCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
        {/* Glow Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#39FF14] transition-colors mb-8">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
            Privacy <span className="text-[#39FF14]">Policy</span>
          </h1>
          <p className="text-gray-500 mt-4 font-mono uppercase tracking-widest text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 gap-8">
          
          {/* Section 1: Collection */}
          <div className="bg-[#121212] border border-gray-800 p-8 md:p-12 rounded-[2.5rem] hover:border-[#39FF14]/30 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="bg-[#39FF14]/10 p-4 rounded-2xl group-hover:bg-[#39FF14] group-hover:text-black transition-all">
                <Eye size={32} className="text-[#39FF14] group-hover:text-black" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">Information We Collect</h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  We collect information you provide when creating an account, including your 
                  <span className="text-white"> email, username, and profile information</span>. 
                  This helps us personalize your audio journey.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Usage */}
          <div className="bg-[#121212] border border-gray-800 p-8 md:p-12 rounded-[2.5rem] hover:border-[#39FF14]/30 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="bg-[#39FF14]/10 p-4 rounded-2xl group-hover:bg-[#39FF14] group-hover:text-black transition-all">
                <Shield size={32} className="text-[#39FF14] group-hover:text-black" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">How We Use Your Data</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "To provide and maintain our service",
                    "To notify you about changes",
                    "To provide customer support",
                    "To gather analysis to improve"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Security & Rights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#121212] border border-gray-800 p-8 rounded-[2.5rem] space-y-4">
              <Lock className="text-[#39FF14]" size={28} />
              <h3 className="text-xl font-bold uppercase">Data Security</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We implement elite security measures to protect your personal information. 
                However, remember that no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div className="bg-[#121212] border border-gray-800 p-8 rounded-[2.5rem] space-y-4">
              <UserCheck className="text-[#39FF14]" size={28} />
              <h3 className="text-xl font-bold uppercase">Your Rights</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                You have the right to access, update, or delete your personal information 
                at any time through your <Link to="/profile" className="text-[#39FF14] hover:underline">profile settings</Link>.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}