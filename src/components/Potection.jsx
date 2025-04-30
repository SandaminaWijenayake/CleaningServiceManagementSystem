import React from "react";
import { Navigate, Outlet } from "react-router";

const Protection = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/auth/Login" replace />;
  }

  return <Outlet />;
};

export default Protection;
