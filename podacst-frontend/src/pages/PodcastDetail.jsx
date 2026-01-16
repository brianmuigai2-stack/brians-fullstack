import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { podcastsApi } from "../api/podcasts";
import { commentsApi } from "../api/comments";
import { favoritesApi } from "../api/favorites";
import { useAuth } from "../context/AuthContext";
import { Heart, Play, Clock, Users, MessageSquare, Send, ArrowLeft } from "lucide-react";

export default function PodcastDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [podcast, setPodcast] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    podcastsApi.getById(id).then(setPodcast).catch(console.error);
    commentsApi.getByPodcast(id).then(setComments).catch(console.error);
    if (user) {
      favoritesApi.getAll().then(favs => {
        setIsFavorite(favs.some(f => f.podcast_id === parseInt(id)));
      }).catch(console.error);
    }
  }, [id, user]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await commentsApi.create({ podcast_id: parseInt(id), content: newComment });
      setNewComment("");
      const updated = await commentsApi.getByPodcast(id);
      setComments(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await favoritesApi.remove(id);
      } else {
        await favoritesApi.add(id);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  if (!podcast) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Header Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={podcast.cover_image_url} 
            alt={podcast.title} 
            className="w-full h-full object-cover opacity-40 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-8">
          <Link to="/" className="absolute top-8 left-4 flex items-center gap-2 text-gray-400 hover:text-[#39FF14] transition-colors">
            <ArrowLeft size={20} /> Back to Browse
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <img 
              src={podcast.cover_image_url} 
              alt={podcast.title} 
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-[0_0_30px_rgba(57,255,20,0.2)] border border-gray-800"
            />
            <div className="flex-1 space-y-4">
              <span className="bg-[#39FF14] text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                {podcast.category.name}
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{podcast.title}</h1>
              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <span className="flex items-center gap-2"><Users size={18} className="text-[#39FF14]" /> {podcast.listen_count.toLocaleString()} Listeners</span>
                {podcast.duration_seconds && (
                  <span className="flex items-center gap-2"><Clock size={18} className="text-[#39FF14]" /> {Math.floor(podcast.duration_seconds / 60)} min</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: Player and Description */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-[#121212] border border-gray-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Play size={24} fill="#39FF14" className="text-[#39FF14]" /> Now Playing
                </h3>
                {user && (
                  <button 
                    onClick={toggleFavorite} 
                    className={`p-3 rounded-full transition-all ${isFavorite ? 'bg-[#39FF14] text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                )}
              </div>
              
              <audio controls className="w-full custom-audio-player">
                <source src={podcast.audio_url} type="audio/mpeg" />
              </audio>

              <div className="pt-6 border-t border-gray-800">
                <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-4">About this Podcast</h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {podcast.description}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                <MessageSquare className="text-[#39FF14]" /> Comments ({comments.length})
              </h2>

              {user && (
                <form onSubmit={handleAddComment} className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Join the conversation..."
                    className="w-full bg-[#121212] border border-gray-800 rounded-[1.5rem] p-6 text-white placeholder-gray-600 focus:border-[#39FF14] transition-all outline-none resize-none"
                    rows="3"
                  />
                  <button className="absolute bottom-4 right-4 bg-[#39FF14] text-black p-3 rounded-xl hover:scale-110 transition-all shadow-lg">
                    <Send size={20} />
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-12 bg-[#121212] rounded-[1.5rem] border border-dashed border-gray-800">
                    <p className="text-gray-500">No waves yet. Be the first to shout out!</p>
                  </div>
                ) : (
                  comments.map(comment => (
                    <div key={comment.id} className="bg-[#121212] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[#39FF14] font-black text-sm uppercase tracking-widest">
                          @{comment.user?.username || 'listener'}
                        </span>
                        <span className="text-xs text-gray-600">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Metadata or Related (Empty for now to match layout) */}
          <div className="hidden lg:block space-y-8">
            <div className="bg-gradient-to-br from-[#39FF14]/10 to-transparent border border-[#39FF14]/20 rounded-[2.5rem] p-8">
              <h4 className="text-[#39FF14] font-black uppercase mb-4 tracking-tighter">PodWave Insights</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">Format</span>
                  <span className="text-white">Audio/MP3</span>
                </li>
                <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">Global Rank</span>
                  <span className="text-white">#12 in {podcast.category.name}</span>
                </li>
                <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">Interaction</span>
                  <span className="text-white">High</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}