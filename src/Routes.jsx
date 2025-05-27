import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Admin from "./Admin";
import Driver from "./Driver";
import Teknisi from "./Teknisi";
import LoginAdmin from "./LoginAdmin";
import Register from "./Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/driver" element={<Driver />} />
      <Route path="/teknisi" element={<Teknisi />} />
      <Route path="/loginadmin" element={<LoginAdmin />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
