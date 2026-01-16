import { useState } from 'react';
import { Link } from 'react-router-dom';
import { favoritesApi } from '../api/favorites';
import { useAuth } from '../context/AuthContext';
import { Play, Heart, Users, Clock } from 'lucide-react';

export default function PodcastCard({ podcast, isFavorite: initialFavorite, onFavoriteChange }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (isFavorite) {
        await favoritesApi.remove(podcast.id);
      } else {
        await favoritesApi.add(podcast.id);
      }
      setIsFavorite(!isFavorite);
      if (onFavoriteChange) onFavoriteChange();
    } catch (err) {
      console.error(err);
    }
  };
  
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const CardWrapper = user ? Link : 'div';
  const cardProps = user 
    ? { 
        to: `/podcast/${podcast.id}`,
        className: "group block bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden hover:border-[#39FF14]/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(57,255,20,0.15)] hover:scale-[1.02] cursor-pointer"
      }
    : {
        className: "group block bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden opacity-60 cursor-not-allowed"
      };

  return (
    <CardWrapper 
      {...cardProps}
      onMouseEnter={() => user && setIsHovered(true)}
      onMouseLeave={() => user && setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {podcast.cover_image_url ? (
          <img 
            src={podcast.cover_image_url} 
            alt={podcast.title} 
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <Play className="w-16 h-16 text-gray-600" />
          </div>
        )}
        
        {/* Overlay on hover - only for authenticated users */}
        {user && (
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-14 h-14 rounded-full bg-[#39FF14] flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.5)]">
              <Play className="w-6 h-6 text-black" fill="black" />
            </div>
          </div>
        )}
        
        {/* Lock icon overlay for non-authenticated users */}
        {!user && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400">Login Required</p>
            </div>
          </div>
        )}
        
        {/* Favorite button */}
        {user && (
          <button 
            onClick={toggleFavorite} 
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-black/90 transition-all z-10 border border-gray-700/50"
          >
            <Heart 
              className={`w-5 h-5 transition-all ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} 
            />
          </button>
        )}
      </div>
      
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-[#39FF14] bg-[#39FF14]/10 rounded-full border border-[#39FF14]/20">
            {podcast.category?.name}
          </span>
        </div>
        
        <h3 className={`text-lg font-bold text-white line-clamp-2 transition-colors ${user ? 'group-hover:text-[#39FF14]' : ''}`}>
          {podcast.title}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {podcast.description}
        </p>
        
        <div className="flex items-center justify-between pt-2 text-sm text-gray-500 border-t border-gray-800">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {formatNumber(podcast.listen_count)}
          </span>
          {podcast.duration_seconds && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {Math.floor(podcast.duration_seconds / 60)}m
            </span>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}
