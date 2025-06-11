import React, { useState, useEffect } from "react";
import LoginAdmin from "./LoginAdmin";
import LoginDriver from "./LoginDriver";
import LoginTeknisi from "./LoginTeknisi";
import backgroundImageTeknisi from "../assets/img/mekanikLogin.jpg";
import backgroundImageAdmin from "../assets/img/LoginAdmin.jpg";
import backgroundImageDriver from "../assets/img/DriverLogin.jpg";

const AuthPage = ({ onLogin }) => {
  const [activeForm, setActiveForm] = useState("driver");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const preloadImages = [
      backgroundImageAdmin,
      backgroundImageDriver,
      backgroundImageTeknisi,
    ];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleChangeRole = (role) => {
    if (role !== activeForm) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveForm(role);
        setIsTransitioning(false);
      }, 700);
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case "admin":
        return <LoginAdmin onLogin={() => onLogin("admin")} />;
      case "driver":
        return <LoginDriver onLogin={() => onLogin("driver")} />;
      case "teknisi":
        return <LoginTeknisi onLogin={() => onLogin("teknisi")} />;
      default:
        return null;
    }
  };

  const getBackgroundImage = () => {
    switch (activeForm) {
      case "admin":
        return backgroundImageAdmin;
      case "driver":
        return backgroundImageDriver;
      case "teknisi":
        return backgroundImageTeknisi;
      default:
        return backgroundImageDriver;
    }
  };

  const backgroundImage = getBackgroundImage();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden">
      {/* Background image layer */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ease-in-out ${
          isTransitioning ? "blur-sm opacity-60" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* LEFT SIDE TEXT */}
        <div className="text-white max-w-md space-y-4">
          <h1 className="text-6xl font-bold leading-tight">
            SAGARA DAILY CHECKUP
          </h1>
          <p className="text-lg font-light">
            Attention To Details is the key to Passenger Safety & Comfort.
          </p>
          <p className="text-sm">Every Kilometer Count.</p>
        </div>

        {/* RIGHT SIDE LOGIN CARD */}
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-lg w-full max-w-md space-y-6 cardm">
          <div className="text-center">
            <select
              value={activeForm}
              onChange={(e) => handleChangeRole(e.target.value)}
              className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow focus:outline-none custom-select"
            >
              <option value="admin">Admin</option>
              <option value="driver">Driver</option>
              <option value="teknisi">Teknisi</option>
            </select>
          </div>
          <div>{renderForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
