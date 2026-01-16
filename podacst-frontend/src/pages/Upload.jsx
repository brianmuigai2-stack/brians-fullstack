import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { podcastsApi } from "../api/podcasts";
import { categoriesApi } from "../api/categories";
import { useAuth } from "../context/AuthContext";
import { Mic, Music, Image as ImageIcon, Tag, Clock, Plus, X, Radio } from "lucide-react";

const SUGGESTED_CATEGORIES = [
  "Technology", "Business", "Education", "Comedy", "News & Politics",
  "Health & Fitness", "True Crime", "Sports", "Music", "Science",
  "History", "Arts & Culture", "Self-Improvement", "Gaming", "Food & Cooking",
  "Travel", "Religion & Spirituality", "Parenting", "Fiction", "Society & Culture"
];

export default function Upload() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audio_url: "",
    cover_image_url: "",
    category_id: "",
    duration_seconds: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    categoriesApi.getAll().then(setCategories).catch(console.error);
  }, [user, navigate]);

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const category = await categoriesApi.create({ name: newCategory, description: "" });
      setCategories([...categories, category]);
      setFormData({...formData, category_id: category.id});
      setNewCategory("");
      setShowCategoryInput(false);
    } catch (err) {
      setError("Error creating category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: formData.title,
        description: formData.description || null,
        audio_url: formData.audio_url,
        cover_image_url: formData.cover_image_url || null,
        category_id: parseInt(formData.category_id),
        duration_seconds: formData.duration_seconds ? parseInt(formData.duration_seconds) : null,
      };
      const podcast = await podcastsApi.create(data);
      navigate(`/podcast/${podcast.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-10">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Studio Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">
              Studio <span className="text-[#39FF14]">Upload</span>
            </h1>
            <p className="text-gray-500 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
              <Radio size={16} className="text-[#39FF14] animate-pulse" /> Live Broadcast Preparation
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-2">
              <X size={18} /> {error}
            </div>
          )}

          {/* Main Info Card */}
          <div className="bg-[#121212] border border-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
            
            {/* Title & Description */}
            <div className="space-y-6">
              <div className="relative">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-6 mb-2 flex items-center gap-2">
                  <Mic size={14} className="text-[#39FF14]" /> Episode Title *
                </label>
                <input
                  type="text"
                  placeholder="The Future of Sound..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-full px-8 py-5 text-white focus:border-[#39FF14] transition-all outline-none text-xl font-bold"
                  required
                />
              </div>

              <div className="relative">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-6 mb-2 flex items-center gap-2">
                  <Tag size={14} /> Show Notes / Description
                </label>
                <textarea
                  placeholder="What is this episode about?"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-[2rem] px-8 py-5 text-white focus:border-[#39FF14] transition-all outline-none min-h-[150px] resize-none"
                />
              </div>
            </div>

            {/* Media Assets Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-6 flex items-center gap-2">
                  <Music size={14} className="text-[#39FF14]" /> Audio Source URL *
                </label>
                <input
                  type="url"
                  placeholder="https://cloud.storage/audio.mp3"
                  value={formData.audio_url}
                  onChange={(e) => setFormData({...formData, audio_url: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-full px-6 py-4 text-sm text-gray-300 focus:border-[#39FF14] transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-6 flex items-center gap-2">
                  <ImageIcon size={14} className="text-[#39FF14]" /> Cover Art URL
                </label>
                <input
                  type="url"
                  placeholder="https://cloud.storage/cover.jpg"
                  value={formData.cover_image_url}
                  onChange={(e) => setFormData({...formData, cover_image_url: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-full px-6 py-4 text-sm text-gray-300 focus:border-[#39FF14] transition-all outline-none"
                />
              </div>
            </div>

            {/* Category & Logic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-6 flex items-center gap-2">
                  Category *
                </label>
                {showCategoryInput ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Custom Category"
                      className="w-full bg-black border border-[#39FF14] rounded-full px-6 py-4 text-white outline-none"
                      list="category-suggestions"
                    />
                    <datalist id="category-suggestions">
                      {SUGGESTED_CATEGORIES.map(cat => <option key={cat} value={cat} />)}
                    </datalist>
                    <div className="flex gap-2 px-2">
                      <button type="button" onClick={handleCreateCategory} className="text-[#39FF14] text-xs font-bold uppercase tracking-tighter hover:underline">Confirm</button>
                      <button type="button" onClick={() => setShowCategoryInput(false)} className="text-gray-500 text-xs font-bold uppercase tracking-tighter hover:underline">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-full px-6 py-4 text-white appearance-none focus:border-[#39FF14] outline-none"
                      required
                    >
                      <option value="">Choose Genre</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    <button type="button" onClick={() => setShowCategoryInput(true)} className="flex items-center gap-1 text-[#39FF14] text-xs font-black uppercase tracking-widest ml-4 hover:scale-105 transition-transform">
                      <Plus size={14} /> New Category
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-6 flex items-center gap-2">
                  <Clock size={14} className="text-[#39FF14]" /> Length (Sec)
                </label>
                <input
                  type="number"
                  placeholder="3600"
                  value={formData.duration_seconds}
                  onChange={(e) => setFormData({...formData, duration_seconds: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-full px-6 py-4 text-white focus:border-[#39FF14] transition-all outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[#39FF14] text-black font-black py-6 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)] text-xl tracking-tighter uppercase">
              Publish to Wave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}