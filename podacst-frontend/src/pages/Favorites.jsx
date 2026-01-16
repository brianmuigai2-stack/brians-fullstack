import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { favoritesApi } from "../api/favorites";
import { useAuth } from "../context/AuthContext";
import PodcastCard from "../components/PodcastCard";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadFavorites();
  }, [user, navigate]);

  const loadFavorites = () => {
    favoritesApi.getAll()
      .then(setFavorites)
      .catch(console.error);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#4666FF]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">❤️ My </span>
              <span className="text-[#39FF14]">Favorites</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-[#0a0a0a] border-y border-gray-800">
        <div className="container mx-auto px-4">
          {favorites.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-center py-16 bg-[#1a1a1a] rounded-2xl border border-gray-800">
                <div className="w-24 h-24 rounded-full bg-[#39FF14]/10 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-gray-600" />
                </div>
                <p className="text-4xl mb-4">🤍</p>
                <p className="text-gray-400 text-xl mb-6">No favorites yet</p>
                <Link 
                  to="/" 
                  className="inline-block px-8 py-3 bg-[#39FF14] text-black font-semibold rounded-lg hover:bg-[#22E600] transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
                >
                  Browse podcasts
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map(podcast => (
                <PodcastCard
                  key={podcast.id}
                  podcast={podcast}
                  isFavorite={true}
                  onFavoriteChange={loadFavorites}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}