import{ useState } from 'react';
import { Menu, X, Home, BookOpen, User, Mail } from 'lucide-react';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">MyBlog</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium flex items-center space-x-1">
              <Home size={18} />
              <span>Home</span>
            </a>
            {/* <a href="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium flex items-center space-x-1">
              <BookOpen size={18} />
              <span>Blogs</span>
            </a> */}
            <a href="/about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium flex items-center space-x-1">
              <User size={18} />
              <span>About</span>
            </a>
            <a href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors font-medium flex items-center space-x-1">
              <Mail size={18} />
              <span>Contact</span>
            </a>
          </div>

          <div>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-pink-100">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium flex items-center space-x-2 px-2 py-1">
                <Home size={18} />
                <span>Home</span>
              </a>
              <a href="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium flex items-center space-x-2 px-2 py-1">
                <BookOpen size={18} />
                <span>Blogs</span>
              </a>
              <a href="/about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium flex items-center space-x-2 px-2 py-1">
                <User size={18} />
                <span>About</span>
              </a>
              <a href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors font-medium flex items-center space-x-2 px-2 py-1">
                <Mail size={18} />
                <span>Contact</span>
              </a>
              {/* <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all font-medium mx-2">
                Write Blog
              </button> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav