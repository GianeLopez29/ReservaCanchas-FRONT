import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Canchas from './pages/Canchas';
import CanchaDetalle from './pages/CanchaDetalle';
import MisReservas from './pages/MisReservas';
import useAuth from './hooks/useAuth';

function App() {
  const { user, token, login, logout } = useAuth();

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register login={login} />} />
        <Route path="/canchas" element={<Canchas />} />
        <Route path="/canchas/:id" element={<CanchaDetalle token={token} user={user} />} />
        <Route path="/mis-reservas" element={<MisReservas token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
