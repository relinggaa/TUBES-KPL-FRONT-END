import { useState } from "react";
import { useNavigate } from "react-router-dom";
import navlogo from "../assets/img/logo-sagara.png";

const LoginAdmin = ({ onLogin }) => {
  const [input, setInput] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (input.username === "admin" && input.password === "admin123") {
      onLogin("admin");

      navigate("/admin");
    } else {
      alert("Login gagal");
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-xl text-center">
      <img className="mx-auto mb-8 w-40" src={navlogo} alt="Logo" />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={input.username}
          onChange={(e) => setInput({ ...input, username: e.target.value })}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Input Key"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-blue-500 underline hover:text-blue-700 cursor-pointer">
          Need any help? Contact here
        </p>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Log As Admin
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
