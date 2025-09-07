import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card"
import BlogListing from "../../components/BlogListing";
import { Loader } from "lucide-react";


const LandingPage = () => {
  
const [blogList, setBlogList] = useState([]);
const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://blog-fullstackapp.onrender.com/api/v1/blogs/get-all-blogs`,
        );
        setBlogList(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }finally{
        setLoading(false)
      }
    };
    fetchBlogs();
  }, []);

  if(loading){
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

  return (
    <>
    <BlogListing blogs={blogList} />
    </>
  )
}
export default LandingPage