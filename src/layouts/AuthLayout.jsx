import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-400 flex items-center justify-center px-4 ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
