import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PublicOnlyRoute = () => {
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
