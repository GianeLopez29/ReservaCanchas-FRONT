import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Encontrá la Cancha Ideal para tu Partido</h1>
        <p className="hero-subtitle">Elegí, reservá y jugá. El partido empieza acá.</p>
        <Link to="/canchas" className="btn-hero">
          Ver Canchas Disponibles
          <span className="btn-icon">⚡</span>
        </Link>
        <p className="hero-info">Disponibilidad en tiempo real y confirmación instantánea.</p>
      </div>
      
      <div className="features">
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h3>Reserva Rápida</h3>
          <p>Reserva en segundos con nuestro sistema intuitivo</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔒</div>
          <h3>Seguro</h3>
          <p>Tus datos están protegidos con encriptación</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📧</div>
          <h3>Confirmación Instantánea</h3>
          <p>Recibe confirmación por email al instante</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
