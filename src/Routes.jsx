// src/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import Admin from "./Admin";
import Driver from "./Driver";
import Teknisi from "./Teknisi";

import LoginAdmin from "./pages/LoginAdmin";
import LoginDriver from "./pages/LoginDriver";
import LoginTeknisi from "./pages/LoginTeknisi";
import Register from "./pages/Register";
import AuthPage from "./pages/AuthPage";

import PrivateRoutes from "./components/PrivateRoutes";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

function AppRoutes({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Routes untuk login/register dengan AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-driver" element={<LoginDriver />} />
        <Route path="/login-teknisi" element={<LoginTeknisi />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<AuthPage />} />
      </Route>

      {/* Routes yang dilindungi dengan PrivateRoutes dan menggunakan MainLayout */}
      <Route
        element={
          <PrivateRoutes isLoggedIn={isLoggedIn}>
            <MainLayout />
          </PrivateRoutes>
        }
      >
        <Route path="/admin" element={<Admin />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/teknisi" element={<Teknisi />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
