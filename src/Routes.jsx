import { Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Admin from './Admin';
import Driver from './Driver';
import Teknisi from './Teknisi';
import Login from './Login';
import Register from './Register';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/driver" element={<Driver />} />
      <Route path="/teknisi" element={<Teknisi />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
