
import {BookOpen, Mail, Github, X, Linkedin} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-pink-50 to-rose-100 border-t border-pink-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            {/* <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">MyBlog</span>
            </div> */}
            <div className="flex items-center space-x-2 mb-4 w-25">
             <img src="src/img/logo.png" alt="" srcset="" />
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Discover amazing stories, tutorials, and insights on web development, 
              programming, and technology. Join our community of passionate writers and readers.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                <X size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-pink-600 transition-colors">Home</a></li>
              <li><a href="/" className="text-gray-600 hover:text-pink-600 transition-colors">All Blogs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 hover:text-pink-600 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-pink-600 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-pink-200 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} MyBlog. All rights reserved. Made with ❤️ for the community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer