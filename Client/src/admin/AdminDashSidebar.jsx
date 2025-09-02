

const AdminDashSidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-[290px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50">
   

      <div className="flex flex-col px-5 overflow-y-auto no-scrollbar">
      <div className="main flex">
      <div className="sidebar bg-gray-900 text-white w-64 h-screen p-4">
        {/* Navigation */}
        <div className="nav space-y-4">
          <div className="nav-option flex items-center gap-3 hover:text-green-500">
            <i className="fa-solid fa-house"></i>
            <a href="#" className="text-sm font-medium">Menus</a>
          </div>
          <div className="nav-option flex items-center gap-3 hover:text-green-500">
            <i className="fa-solid fa-magnifying-glass"></i>
            <a href="#" className="text-sm font-medium">User Management</a>
          </div>
        </div>

        {/* Library */}
        {/* <div className="library mt-6">
          <div className="option flex items-center justify-between mb-4">
            <div className="lib-option nav-option flex items-center gap-3">
              <img src="/assets/library_icon.png" alt="Library Icon" className="w-5 h-5" />
              <a href="#" className="text-sm font-medium">Your Library</a>
            </div>
            <div className="icons flex gap-2 text-lg">
              <i className="fa-solid fa-plus cursor-pointer hover:text-green-500"></i>
              <i className="fa-solid fa-right-long cursor-pointer hover:text-green-500"></i>
            </div>
          </div>

          <div className="lib-box space-y-4">
            <div className="box bg-gray-800 p-4 rounded-lg">
              <p className="box-p1 text-white font-semibold text-sm">Create your first playlist</p>
              <p className="box-p2 text-gray-400 text-xs mt-1">It's easy, we'll help you</p>
              <button className="badge mt-3 bg-white text-black px-3 py-1 text-xs rounded-full font-medium">
                Create playlist
              </button>
            </div>
            <div className="box bg-gray-800 p-4 rounded-lg">
              <p className="box-p1 text-white font-semibold text-sm">Let’s find some podcasts to follow</p>
              <p className="box-p2 text-gray-400 text-xs mt-1">We’ll keep you updated on new episodes</p>
              <button className="badge mt-3 bg-white text-black px-3 py-1 text-xs rounded-full font-medium">
                Browse podcasts
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>

      
      </div>
    </aside>
  );
};

export default AdminDashSidebar;
