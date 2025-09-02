import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card"
import BlogListing from "../../components/BlogListing";


const LandingPage = () => {
  
const [blogList, setBlogList] = useState([]);

    useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://blog-fullstackapp.onrender.com/api/v1/blogs/get-all-blogs`,
        );
        setBlogList(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <>
    <BlogListing blogs={blogList} />
    </>
  )
}
export default LandingPage