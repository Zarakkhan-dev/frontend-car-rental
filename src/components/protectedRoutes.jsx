import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  return isLoggedIn? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
