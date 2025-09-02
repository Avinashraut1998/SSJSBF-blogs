import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Articles from "./pages/landingPage/Articles.jsx";
import Gallery from "./pages/landingPage/Gallery.jsx";
import About from "./pages/landingPage/About.jsx";
import Contact from "./pages/landingPage/Contact.jsx";
import Login from "./admin/Login.jsx";
import PasswordReset from "./admin/PasswordReset.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import LoginHookForm from "./admin/LoginHookForm.jsx";
import AdminLayout from "./dashboard/AdminLayout.jsx";
import BlogManagement from "./dashboard/BlogManagement.jsx";
import UserManagement from "./dashboard/UserManagement.jsx";
import { ToastContainer } from "react-toastify";
import SingleBlog from "./components/SingleBlog.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        {/* LandingPage-Routes */}

        <Route index element={<LandingPage />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/article" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      // {/* Admin page routes */}
      <Route path="/admin-login" element={<LoginHookForm />} />
      <Route path="/admin-login/forgetpass" element={<PasswordReset />} />
      <Route path="/admin-login/admin-dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />

      {/*New Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<div>Home</div>} />
        <Route path="users" element={<UserManagement />} />
        <Route path="blogs-management" element={<BlogManagement />} />
        <Route path="settings" element={<div>Settings</div>} />
      </Route>

    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    {/* <App /> */}
  </StrictMode>
);
