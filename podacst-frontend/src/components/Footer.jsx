import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-[family-name:var(--font-family-heading)]">
              🎧 <span className="text-[#39FF14]">Pod</span>Wave
            </h3>
            <p className="text-sm text-gray-400">
              Your ultimate podcast streaming platform. Discover, listen, and share amazing audio content from creators worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#39FF14] transition-colors">Home</Link></li>
              <li><Link to="/upload" className="hover:text-[#39FF14] transition-colors">Upload Podcast</Link></li>
              <li><Link to="/favorites" className="hover:text-[#39FF14] transition-colors">My Favorites</Link></li>
              <li><Link to="/profile" className="hover:text-[#39FF14] transition-colors">Profile</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[#39FF14] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#39FF14] transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-[#39FF14] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#39FF14] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Creators</h4>
            <p className="text-sm text-gray-400 mb-3">
              Built with ❤️ by passionate developers dedicated to bringing quality podcast streaming to everyone.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-[#39FF14] transition-colors">GitHub</a>
              <a href="#" className="hover:text-[#39FF14] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#39FF14] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PodWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
