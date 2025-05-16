import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Driver from "./Driver";
import Teknisi from "./Teknisi";
import Landing from "./Landing";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/driver" element={<Driver />} />
      <Route path="/teknisi" element={<Teknisi />} />
    </Routes>
  );
}

export default RoutesComponent;
