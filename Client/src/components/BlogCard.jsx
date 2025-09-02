import { Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router';

const BlogCard = ({ blog, onClick }) => {
 const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleCardClick = () => {
    navigate(`/blog/${blog._id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-pink-100 hover:border-pink-200 transform hover:-translate-y-1"
      onClick={() => onClick(blog)}
    >
      <div className="flex items-start justify-between mb-4">
        {/* <span className="inline-block bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1 rounded-full">
          {blog.status}
        </span> */}
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        {blog.title}
      </h3>
      
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <User size={16} className="text-pink-400" />
          <span>{blog.author.firstName} {blog.author.lastName}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-pink-400" />
          <span>{formatDate(blog.publishedAt)}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-pink-50">
        <button
         className="text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors"
        onClick={handleCardClick}>
          Read more →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;