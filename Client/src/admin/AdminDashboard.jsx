import CreateUser from "./Admin-User/CreateUser";
import UserTable from "./Admin-User/UserTable";
import AdminDashNav from "./AdminDashNav";
import AdminDashSidebar from "./AdminDashSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <AdminDashSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ml-5">
        
        {/* Top Navbar */}
        <header>
          <AdminDashNav />
        </header>

        {/* Main Body Content */}
        <main className="flex-1  p-6 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
          {/* You can render routes or content components here */}
            <div>
              <CreateUser/>
            </div>
            <div>
              <UserTable/>
            </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
