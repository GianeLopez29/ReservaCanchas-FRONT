import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MisReservas.css';

const MisReservas = ({ token }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservas/mis-reservas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReservas(response.data);
      } catch (err) {
        console.error('Error al cargar reservas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [token, navigate]);

  const handleCancelar = async (id) => {
    if (!window.confirm('¿Estás seguro de cancelar esta reserva?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/reservas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(reservas.filter(r => r._id !== id));
    } catch (err) {
      alert('Error al cancelar la reserva');
    }
  };

  if (loading) return <div className="loading">Cargando reservas...</div>;

  return (
    <div className="mis-reservas">
      <h1>Mis Reservas</h1>
      {reservas.length === 0 ? (
        <div className="no-reservas">
          <p>No tienes reservas aún</p>
          <button onClick={() => navigate('/canchas')} className="btn-reservar">
            Ver Canchas Disponibles
          </button>
        </div>
      ) : (
        <div className="reservas-list">
          {reservas.map(reserva => (
            <div key={reserva._id} className="reserva-card">
              <img src={reserva.cancha.imagen} alt={reserva.cancha.nombre} />
              <div className="reserva-info">
                <h3>{reserva.cancha.nombre}</h3>
                <p><strong>Tipo:</strong> {reserva.cancha.tipo}</p>
                <p><strong>Fecha:</strong> {reserva.fecha}</p>
                <p><strong>Hora:</strong> {reserva.hora}</p>
                <p><strong>Duración:</strong> {reserva.duracion} hora{reserva.duracion > 1 ? 's' : ''}</p>
                {(reserva.serviciosAdicionales?.indumentaria || reserva.serviciosAdicionales?.buffet || 
                  reserva.serviciosAdicionales?.arbitro || reserva.serviciosAdicionales?.pelota) && (
                  <div className="servicios-contratados">
                    <strong>Servicios:</strong>
                    {reserva.serviciosAdicionales.indumentaria && <span>✅ Indumentaria</span>}
                    {reserva.serviciosAdicionales.buffet && <span>✅ Buffet</span>}
                    {reserva.serviciosAdicionales.arbitro && <span>✅ Árbitro</span>}
                    {reserva.serviciosAdicionales.pelota && <span>✅ Pelota</span>}
                  </div>
                )}
                <p className="precio-reserva"><strong>Total pagado:</strong> ${reserva.precioTotal}</p>
                <p><strong>Estado:</strong> <span className="estado">{reserva.estado}</span></p>
                <button onClick={() => handleCancelar(reserva._id)} className="btn-cancelar">
                  Cancelar Reserva
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisReservas;
