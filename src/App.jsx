import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './Admin';
import Driver from './Driver';

// Buat ini isi rute-rute lain jika tidak pakai RoutesComponent
function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman login dan register */}
        <Route path="/login" element={<Login />} />
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
