import axios from "axios";
import { FaPowerOff } from "react-icons/fa"
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";


const Navbar = () => {
const navigate = useNavigate()

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await axios
      .post("https://blog-fullstackapp.onrender.com/api/v1/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      })
      .catch((err) => console.log(err));
      if (response) {
        toast.success("Logout successful");
        localStorage.removeItem("accessToken");
          navigate("/admin-login");
      }
  }
  return (
   <>
    <nav className='h-14 border-b border-gray-600 p-4 w-full'>
      <div className="flex justify-end">
        <button type="button" 
        onClick={handleLogout}
         className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center gap-2 dark:focus:ring-[#3b5998]/55 me-2 mb-2 ">
          <FaPowerOff />
          Logout
        </button>
      </div>
    </nav>
   </>
  )
}

export default Navbar