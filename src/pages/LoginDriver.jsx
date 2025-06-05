<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginDriver = () => {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import navlogo from "../assets/img/logo-sagara.png";
import axios from "axios";

const LoginDriver = ({ onLogin }) => {
  const [input, setInput] = useState({ username: "", key: "" });
>>>>>>> Relingga-fecth-api-login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
<<<<<<< HEAD
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Login gagal:", errorText);
        alert("Login gagal");
        return;
      }

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        alert("Login gagal: token tidak ditemukan");
      }
    } catch (err) {
      console.error("Terjadi error:", err);
      alert("Terjadi kesalahan saat login");
=======
      const response = await axios.post(
        "https://localhost:7119/api/Login/loginDriver",
        {
          Username: input.username,
          Key: input.key,
        }
      );

      if (response.data.success) {
        onLogin(response.data.role);
        navigate("/driver");
      } else {
        alert(response.data.message || "Login gagal");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Terjadi kesalahan jaringan.");
>>>>>>> Relingga-fecth-api-login
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login Driver
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
=======
    <div className="bg-white w-full max-w-md p-8 rounded-xl text-center">
      <img className="mx-auto mb-8 w-40" src={navlogo} alt="Logo" />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Driver</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={input.username}
          onChange={(e) => setInput({ ...input, username: e.target.value })}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Input Key"
          value={input.key}
          onChange={(e) => setInput({ ...input, key: e.target.value })}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Log As Driver
        </button>
      </form>
>>>>>>> Relingga-fecth-api-login
    </div>
  );
};

<<<<<<< HEAD
export default LoginAdmin;
=======
export default LoginDriver;
>>>>>>> Relingga-fecth-api-login
