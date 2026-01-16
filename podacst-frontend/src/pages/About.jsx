import { Headphones, Globe, Users, Sparkles, Heart, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#4666FF]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">About </span>
              <span className="text-[#39FF14]">PodWave</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#0a0a0a] border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 border border-gray-800 space-y-8">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                PodWave is a modern podcast streaming platform designed to connect listeners with amazing audio content from creators around the world.
              </p>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Our <span className="text-[#39FF14]">Mission</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We believe in the power of audio storytelling and aim to provide a seamless platform where creators can share their voices and listeners can discover content that inspires, educates, and entertains.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  What We <span className="text-[#39FF14]">Offer</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-gray-800/50 hover:border-[#39FF14]/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Headphones className="w-5 h-5 text-[#39FF14]" />
                    </div>
                    <p className="text-gray-300 text-lg">High-quality audio streaming</p>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-gray-800/50 hover:border-[#39FF14]/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Globe className="w-5 h-5 text-[#39FF14]" />
                    </div>
                    <p className="text-gray-300 text-lg">Easy podcast discovery across multiple categories</p>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-gray-800/50 hover:border-[#39FF14]/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-5 h-5 text-[#39FF14]" />
                    </div>
                    <p className="text-gray-300 text-lg">Simple upload process for creators</p>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-gray-800/50 hover:border-[#39FF14]/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-5 h-5 text-[#39FF14]" />
                    </div>
                    <p className="text-gray-300 text-lg">Community engagement through comments and favorites</p>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-gray-800/50 hover:border-[#39FF14]/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Heart className="w-5 h-5 text-[#39FF14]" />
                    </div>
                    <p className="text-gray-300 text-lg">Free access to thousands of podcasts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}