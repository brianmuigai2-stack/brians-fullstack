import { useState, useEffect } from "react";
import { podcastsApi } from "../api/podcasts";
import { categoriesApi } from "../api/categories";
import { favoritesApi } from "../api/favorites";
import { useAuth } from "../context/AuthContext";
import PodcastCard from "../components/PodcastCard";
import { Search, SlidersHorizontal, Radio } from "lucide-react";

export default function Explore() {
  const { user } = useAuth();
  const [podcasts, setPodcasts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    podcastsApi.getAll().then(setPodcasts).catch(console.error);
    categoriesApi.getAll().then(setCategories).catch(console.error);
    if (user) {
      favoritesApi.getAll().then(setFavorites).catch(console.error);
    }
  }, [user]);

  const filteredPodcasts = podcasts.filter(p => {
    const matchesCategory = selectedCategory ? p.category.id === selectedCategory : true;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">
              Explore <span className="text-[#39FF14]">The Wave</span>
            </h1>
            <p className="text-gray-500 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
              <Radio size={16} className="text-[#39FF14]" /> {filteredPodcasts.length} Channels Live
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text"
              placeholder="Search titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-gray-800 rounded-full py-4 pl-12 pr-6 focus:border-[#39FF14] outline-none transition-all"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-3 rounded-full whitespace-nowrap font-bold uppercase text-xs tracking-widest transition-all ${
              !selectedCategory ? 'bg-[#39FF14] text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]' : 'bg-[#121212] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            All Genres
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-8 py-3 rounded-full whitespace-nowrap font-bold uppercase text-xs tracking-widest transition-all ${
                selectedCategory === cat.id ? 'bg-[#39FF14] text-black' : 'bg-[#121212] text-gray-400 border border-gray-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Area */}
        {filteredPodcasts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPodcasts.map(podcast => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                isFavorite={favorites.some(f => f.podcast_id === podcast.id)}
                onFavoriteChange={() => user && favoritesApi.getAll().then(setFavorites)}
              />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center border border-dashed border-gray-800 rounded-[3rem]">
            <p className="text-gray-500 font-mono uppercase tracking-widest">No signals found in this frequency</p>
          </div>
        )}
      </div>
    </div>
  );
}