import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: ""
  });
  const [formError, setFormError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("https://blog-fullstackapp.onrender.com/api/v1/users/get-users", config);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`https://blog-fullstackapp.onrender.com/api/v1/users/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete error", error.response);
    }
  };

  const handleEditSubmit = async () => {
    const { userName, firstName, lastName, email, phoneNumber, role } = editForm;

    if (
      !userName.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !role.trim()
    ) {
      setFormError("All fields are required!");
      return;
    }

    setFormError("");
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(`https://blog-fullstackapp.onrender.com/api/v1/users/update-user/${editUser._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditUser(null);
      fetchUser();
    } catch (error) {
      console.error("Update failed", error.response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center text-title-sm md:text-title-md mb-3">
        <h1 className="text-black dark:text-white">Users</h1>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="bg-white text-sm md:text-base w-full table-auto">
          <thead>
            <tr className="bg-bodydark text-center dark:bg-black">
              <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">User Name</th>
              <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">First Name</th>
              <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">Last Name</th>
              <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">Role</th>
              <th className="min-w-[180px] py-2 px-2 font-bold text-black dark:text-white">Email</th>
              <th className="min-w-[120px] py-2 px-2 font-bold text-black dark:text-white">Phone</th>
              <th className="min-w-[120px] py-2 px-2 font-bold text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length !== 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="dark:bg-graydark text-center">
                  <td className="border-b border-[#eee] py-2 px-2">{user.userName}</td>
                  <td className="border-b border-[#eee] py-2 px-2">{user.firstName}</td>
                  <td className="border-b border-[#eee] py-2 px-2">{user.lastName}</td>
                  <td className="border-b border-[#eee] py-2 px-2">{user.role}</td>
                  <td className="border-b border-[#eee] py-2 px-2">{user.email}</td>
                  <td className="border-b border-[#eee] py-2 px-2">{user.phoneNumber}</td>
                  <td className="border-b border-[#eee] py-2 px-2">
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => setViewUser(user)} aria-label="View"><FaEye /></button>
                      <button
                        onClick={() => {
                          setEditUser(user);
                          setEditForm({
                            userName: user.userName || "",
                            firstName: user.firstName || "",
                            lastName: user.lastName || "",
                            email: user.email || "",
                            phoneNumber: user.phoneNumber || "",
                            role: user.role || ""
                          });

                        }}
                        aria-label="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(user._id)} aria-label="Delete"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* View Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">View User</h2>
            <p><strong>User Name:</strong> {viewUser.userName}</p>
            <p><strong>Name:</strong> {viewUser.firstName} {viewUser.lastName}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Phone:</strong> {viewUser.phoneNumber}</p>
            <p><strong>Role:</strong> {viewUser.role}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setViewUser(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            {formError && <p className="text-red-500 mb-2">{formError}</p>}

            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.userName}
              onChange={(e) => setEditForm({ ...editForm, userName: e.target.value })}
              placeholder="User Name"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.firstName}
              onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
              placeholder="First Name"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.lastName}
              onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
              placeholder="Last Name"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              placeholder="Email"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.phoneNumber}
              onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
              placeholder="Phone Number"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.role}
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              placeholder="Role"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setEditUser(null)}>Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleEditSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default UserTable;
