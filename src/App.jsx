import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Admin from "./Admin";
import Driver from "./Driver";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoutesComponent from "./Routes";
function App() {
  return (
    <>
      <Router>
        <div>
          <RoutesComponent />
        </div>
      </Router>
    </>
  );
}

export default App;
