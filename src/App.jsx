import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/LoginAdmin";
import LoginDriver from "./pages/LoginDriver";
import Register from "./pages/Register";
import Admin from "./Admin";
import Driver from "./Driver";

// Buat ini isi rute-rute lain jika tidak pakai RoutesComponent
function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman login dan register */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-driver" element={<LoginDriver />} />
        <Route path="/register" element={<Register />} />

        {/* Rute lainnya */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/driver" element={<Driver />} />

        {/* Tambahkan rute default jika perlu */}
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
