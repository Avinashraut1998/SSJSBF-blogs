import React from "react";
import { useNavigate } from "react-router";

const AdminDashNav = () => {

const navigate = useNavigate()

const handleLogout = () => {
  
  localStorage.removeItem("accessToken");
navigate("/admin-login");

  
}

  return (
    <nav className="w-full bg-gray-900 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex  items-center justify-end">
        
        {/* Left Section: Logo & Navigation */}
        {/* <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-white">BlogAdmin</h1>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
            <a href="/posts" className="hover:text-gray-300">Posts</a>
            <a href="/categories" className="hover:text-gray-300">Categories</a>
            <a href="/comments" className="hover:text-gray-300">Comments</a>
          </nav>
        </div> */}

        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-4 ">
          {/* <button className="hidden md:inline-block bg-white text-gray-900 px-4 py-1.5 text-sm rounded-full hover:bg-gray-200 transition">
            New Post
          </button> */}
          <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-1.5 text-sm rounded-full flex  items-center hover:bg-gray-700 transition">
            Log-Out
          </button>
         
        </div>
      </div>
    </nav>
  );
};

export default AdminDashNav;
