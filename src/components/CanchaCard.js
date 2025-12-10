import React from 'react';
import { Link } from 'react-router-dom';
import './CanchaCard.css';

const CanchaCard = ({ cancha }) => {
  const precioFinal = cancha.promocion?.activa 
    ? Math.round(cancha.precioBase * (1 - cancha.promocion.descuento / 100))
    : cancha.precioBase;

  return (
    <div className="cancha-card">
      {cancha.promocion?.activa && (
        <div className="promo-badge">{cancha.promocion.descuento}% OFF</div>
      )}
      <img src={cancha.imagen} alt={cancha.nombre} className="cancha-image" />
      <div className="cancha-info">
        <h3>{cancha.nombre}</h3>
        <p className="cancha-tipo">{cancha.tipo}</p>
        <div className="instalaciones-icons">
          {cancha.instalaciones?.vestidores && <span title="Vestidores" className="icon-outline">👔</span>}
          {cancha.instalaciones?.duchas && <span title="Duchas" className="icon-outline">💧</span>}
          {cancha.instalaciones?.estacionamiento && <span title="Estacionamiento" className="icon-outline">🚗</span>}
          {cancha.instalaciones?.iluminacion && <span title="Iluminación" className="icon-outline">☀️</span>}
        </div>
        <div className="precio-container">
          {cancha.promocion?.activa && (
            <span className="precio-anterior">${cancha.precioBase}</span>
          )}
          <p className="cancha-precio">${precioFinal}/hora</p>
        </div>
        <Link to={`/canchas/${cancha._id}`} className="btn-reservar">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default CanchaCard;
