import BlogCard from "./BlogCard";

const BlogListing = ({ blogs }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome 
          </h1>
          {/* <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing stories, tutorials, and insights on web development, 
            programming, and technology.
          </p> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <BlogCard 
              key={blog._id} 
              blog={blog} 
            />
          ))}
        </div>
        
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No blogs found</h3>
            <p className="text-gray-500">Check back later for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListing;