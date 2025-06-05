import { useState } from "react";
import { useNavigate } from "react-router-dom";
import navlogo from "../assets/img/logo-sagara.png";
import axios from "axios";

const LoginTeknisi = ({ onLogin }) => {
  const [input, setInput] = useState({ username: "", key: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7119/api/Login/loginTeknisi",
        {
          Username: input.username,
          Key: input.key,
        }
      );

      if (response.data.success) {
        onLogin(response.data.role);
        navigate("/teknisi");
      } else {
        alert(response.data.message || "Login gagal");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Terjadi kesalahan jaringan.");
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-xl text-center">
      <img className="mx-auto mb-8 w-40" src={navlogo} alt="Logo" />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Teknisi</h2>
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
          Log As Teknisi
        </button>
      </form>
    </div>
  );
};

export default LoginTeknisi;
