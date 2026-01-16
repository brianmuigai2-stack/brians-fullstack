import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usersApi } from "../api/users";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, User, Mail, Lock, LogOut, CheckCircle, XCircle } from "lucide-react";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  
  const [formData, setFormData] = useState({
    email: user?.email || "",
    full_name: user?.full_name || "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(user?.profile_photo || "");
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    if (user?.profile_photo) {
      setProfilePhoto(user.profile_photo);
    }
  }, [user?.profile_photo]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await usersApi.updateMe({ ...formData, profile_photo: profilePhoto });
      updateUser(updatedUser);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error updating profile");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await usersApi.resetPassword(passwordData);
      setPasswordMessage("Password updated successfully!");
      setPasswordData({ current_password: "", new_password: "" });
      setTimeout(() => setPasswordMessage(""), 3000);
    } catch (err) {
      setPasswordMessage(err.message || "Error updating password");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setShowCamera(true);
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      }, 100);
    } catch (err) {
      alert("Camera access denied");
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    setProfilePhoto(canvas.toDataURL('image/jpeg'));
    stopCamera();
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-10">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">
            User <span className="text-[#39FF14]">Settings</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
            Account Management & Studio Identity
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Profile Identity Card */}
          <div className="bg-[#121212] border border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
             {/* Decorative background glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#39FF14]/5 rounded-full blur-[80px]"></div>

            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-4 border-[#39FF14] p-1 overflow-hidden bg-black shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-5xl">👤</div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 flex gap-2">
                  <button onClick={() => fileInputRef.current.click()} className="bg-[#39FF14] text-black p-2 rounded-full hover:scale-110 transition-transform">
                    <Upload size={18} />
                  </button>
                  <button onClick={startCamera} className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform">
                    <Camera size={18} />
                  </button>
                </div>
              </div>

              <div className="text-center md:text-left">
                <span className="text-[#39FF14] font-mono text-xs tracking-widest uppercase">PodWave Creator</span>
                <h2 className="text-3xl font-black tracking-tight">@{user.username}</h2>
                <p className="text-gray-500 text-sm mt-1">Joined {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {showCamera && (
              <div className="mb-10 p-4 bg-black border border-[#39FF14]/30 rounded-3xl overflow-hidden animate-in fade-in duration-500">
                <video ref={videoRef} autoPlay className="w-full max-w-md mx-auto rounded-2xl mb-4" />
                <div className="flex gap-4 justify-center">
                  <button onClick={capturePhoto} className="bg-[#39FF14] text-black px-6 py-2 rounded-full font-bold hover:bg-[#2ee610] transition-colors">
                    Capture Wave
                  </button>
                  <button onClick={stopCamera} className="bg-red-500/20 text-red-500 px-6 py-2 rounded-full font-bold hover:bg-red-500/30 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {message && (
                <div className="flex items-center gap-2 text-[#39FF14] bg-[#39FF14]/10 p-4 rounded-2xl border border-[#39FF14]/20 animate-pulse">
                  <CheckCircle size={20} /> {message}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                    <Mail size={14} /> Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black border border-gray-800 rounded-full px-6 py-4 text-white focus:border-[#39FF14] transition-all outline-none shadow-inner"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full bg-black border border-gray-800 rounded-full px-6 py-4 text-white focus:border-[#39FF14] transition-all outline-none shadow-inner"
                  />
                </div>
              </div>
              
              <button className="w-full md:w-auto bg-[#39FF14] text-black font-black px-10 py-4 rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                UPDATE PROFILE
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </form>
          </div>

          {/* Security Card */}
          <div className="bg-[#121212] border border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl font-black tracking-tight uppercase mb-8 flex items-center gap-3">
              <Lock className="text-[#39FF14]" /> Security <span className="text-gray-600">& Encryption</span>
            </h2>
            
            <form onSubmit={handlePasswordReset} className="space-y-6">
              {passwordMessage && (
                <div className={`flex items-center gap-2 p-4 rounded-2xl border ${passwordMessage.includes("success") ? "bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}>
                  {passwordMessage.includes("success") ? <CheckCircle size={20} /> : <XCircle size={20} />}
                  {passwordMessage}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.current_password}
                  onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-full px-6 py-4 text-white focus:border-[#39FF14] transition-all outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-full px-6 py-4 text-white focus:border-[#39FF14] transition-all outline-none"
                  minLength="8"
                  required
                />
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
                <button className="w-full md:w-auto border-2 border-[#39FF14] text-[#39FF14] font-black px-10 py-4 rounded-full hover:bg-[#39FF14] hover:text-black transition-all">
                  CHANGE PASSWORD
                </button>
                
                <button 
                  type="button"
                  onClick={logout} 
                  className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold uppercase text-sm tracking-widest transition-colors"
                >
                  <LogOut size={18} /> Sign Out of Wave
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}