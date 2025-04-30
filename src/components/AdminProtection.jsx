import { Navigate, Outlet } from "react-router";

const AdminProtection = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    if (!user) return <Navigate to="/auth/Login" replace />;
    if (user.role !== "admin") return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminProtection;
