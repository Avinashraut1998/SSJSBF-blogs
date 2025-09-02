import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Loader } from 'lucide-react';
import axios from 'axios';

const SingleBlog = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `https://blog-fullstackapp.onrender.com/api/v1/blogs/blog/${id}`
        );
        
        setBlog(response.data.blog); 
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setError('Failed to load blog details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBack = () => {
    navigate('/'); 
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="animate-spin h-12 w-12 text-pink-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Loading blog details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-8 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to blogs</span>
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-pink-100 text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={handleBack}
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Back to all blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-8 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to blogs</span>
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-pink-100 text-center">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h2>
            <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={handleBack}
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Back to all blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to blogs</span>
        </button>
        

        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-pink-100">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
            {blog.title}
          </h1>
      
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-pink-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
                <User size={20} className="text-pink-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {blog.author?.firstName} {blog.author?.lastName}
                </p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar size={18} className="text-pink-400" />
              <span className="text-sm">Published on {formatDate(blog.publishedAt)}</span>
            </div>
          </div>
          
          <div className="prose prose-pink max-w-none">
            <div 
              className="text-gray-700 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />
          </div>
          
        </article>
      </div>
    </div>
  );
};

export default SingleBlog;