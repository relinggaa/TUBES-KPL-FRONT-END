import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import navlogo from "../assets/img/logo-sagara.png";

const MainLayout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus semua data login dari localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    // Jalankan fungsi logout tambahan jika disediakan
    if (onLogout) onLogout();

    // Redirect ke halaman login
    navigate("/login");
  };

  return (
    <>
      <header className="shadow mb-4 bg-white">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center">
            <img src={navlogo} alt="Logo" className="w-32" />
          </Link>
          <nav>
            <ul className="flex space-x-8 items-center">
              <li>
                <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-semibold">
                  Admin
                </Link>
              </li>
              <li>
                <Link to="/driver" className="text-gray-700 hover:text-blue-600 font-semibold">
                  Driver
                </Link>
              </li>
              <li>
                <Link to="/teknisi" className="text-gray-700 hover:text-blue-600 font-semibold">
                  Teknisi
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
