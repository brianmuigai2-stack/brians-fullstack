import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulated API call - replace with: await authApi.forgotPassword(email);
      setMessage("If email exists, reset link has been sent. Check console for link.");
    } catch (err) {
      setMessage("Error sending reset link");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#4666FF]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-white">Reset </span>
              <span className="text-[#39FF14]">Password</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-[#0a0a0a] border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 space-y-6">
              {message && (
                <div className="bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg p-4">
                  <p className="text-[#39FF14] text-center">{message}</p>
                </div>
              )}
              
              <p className="text-gray-400 text-center">Enter your email to receive a password reset link</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-3 text-lg font-medium">Email</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-[#39FF14] text-black px-6 py-4 rounded-lg font-semibold text-lg hover:bg-[#22E600] transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
                >
                  Send Reset Link
                </button>
                
                <a 
                  href="/login"
                  className="flex items-center justify-center gap-2 text-gray-400 hover:text-[#39FF14] transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}