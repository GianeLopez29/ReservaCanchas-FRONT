import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-ball">⚽</span>
          <span className="logo-text">Reserva Canchas</span>
        </Link>
        
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          <span className={isOpen ? 'active' : ''}></span>
          <span className={isOpen ? 'active' : ''}></span>
          <span className={isOpen ? 'active' : ''}></span>
        </button>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/canchas" onClick={closeMenu}>Canchas</Link></li>
          {user ? (
            <>
              <li><Link to="/mis-reservas" onClick={closeMenu}>Mis Reservas</Link></li>
              <li><span className="user-name">Hola, {user.nombre}</span></li>
              <li><button onClick={handleLogout} className="btn-logout">Salir</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={closeMenu}>Iniciar Sesión</Link></li>
              <li><Link to="/register" className="btn-register" onClick={closeMenu}>Registrarse</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
