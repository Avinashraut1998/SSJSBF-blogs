import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("accessToken");


    if (!token) {
        return <Navigate to="/admin-login" />;
    }

    return children;

}
export default ProtectedRoute