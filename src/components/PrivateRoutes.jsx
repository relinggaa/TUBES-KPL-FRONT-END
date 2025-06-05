// src/components/PrivateRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  // Jika children ada, render children, kalau tidak render Outlet untuk nested route
  return children ? children : <Outlet />;
};

export default PrivateRoutes;
