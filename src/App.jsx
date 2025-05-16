import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Admin from "./Admin";
import Driver from "./Driver";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/driver" element={<Driver />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
