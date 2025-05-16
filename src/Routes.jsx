import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Driver from "./Driver";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/driver" element={<Driver />} />
    </Routes>
  );
}

export default RoutesComponent;
