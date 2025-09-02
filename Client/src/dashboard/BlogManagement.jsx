import React, { useEffect, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaX } from "react-icons/fa6";
import CreateBlogs from './CreateBlogs';
import axios from 'axios';

const BlogManagement = () => {
  let [isOpen, setIsOpen] = useState(false)
  let [blogList,setBlogList] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.post(
          `https://blog-fullstackapp.onrender.com/api/v1/blogs/get-user-blogs`,
          { status: 'all' },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        setBlogList(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const blogs = [
    { id: 1, title: "Blog 1", author: "Author 1", date: "2025-07-26" },
    { id: 2, title: "Blog 2", author: "Author 2", date: "2025-07-25" },
    { id: 3, title: "Blog 3", author: "Author 3", date: "2025-07-24" },
  ];

  return (
    <div>
      <h1>BlogManagement</h1>
      <div className='flex justify-end'>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Create Blog</button>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-1">
              <DialogPanel className="w-3/4 h-3/4 space-y-4 border border-white rounded-2xl bg-gray-900 p-6  overflow-x-auto">
                 <div className="flex justify-between">
                 <DialogTitle className="font-bold text-2xl text-white">Add Blog </DialogTitle>
                 <span>
                 <FaX color='white' className='cursor-pointer' onClick={() => setIsOpen(false)}/>
                 </span>
                 </div>
                 <CreateBlogs  />
              </DialogPanel>
            </div>
          </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">

              <th className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">Sr No</th>
              <th className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">Title</th>
              <th className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">Author</th>
              <th className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">Date</th>
              <th className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">Status</th>
              <th className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
           <tbody>
            { blogList.map((blog, index) => (
              <tr key={blog._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">{index + 1  }</td>
                <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">{blog.title}</td>
                <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">
                  {blog.author.firstName} {blog.author.lastName}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-900 dark:text-white">
                  {blog.status}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2">
                    View
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <div >

      </div>
    </div>
  )
}

export default BlogManagement