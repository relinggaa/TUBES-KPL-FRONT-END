import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages & Components
import LoginAdmin from "./pages/LoginAdmin";
import LoginDriver from "./pages/LoginDriver";
import Register from "./pages/Register";
import Admin from "./Admin";
import Driver from "./Driver";
import Teknisi from "./Teknisi";
import Landing from "./Landing";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/PrivateRoutes"; // pastikan namanya PrivateRoute

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn") === "true";
    const storedRole = localStorage.getItem("userRole") || "";
    setIsLoggedIn(storedLogin);
    setUserRole(storedRole);
  }, []);

  // Fungsi untuk dipassing ke halaman login agar update state & localStorage
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
  };

  // Opsional: fungsi logout agar bisa clear state & storage
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Halaman login/register, passing handleLogin agar bisa update state */}
      <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
      <Route path="/login-admin" element={<LoginAdmin onLogin={handleLogin} />} />
      <Route path="/login-driver" element={<LoginDriver onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />

      {/* Halaman berdasarkan role dengan proteksi */}
      <Route
        path="/admin"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn && userRole === "admin"}>
            <Admin onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route
        path="/driver"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn && userRole === "driver"}>
            <Driver onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route
        path="/teknisi"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn && userRole === "teknisi"}>
            <Teknisi onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
