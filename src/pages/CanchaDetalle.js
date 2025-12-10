import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CanchaDetalle.css';

const CanchaDetalle = ({ token, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cancha, setCancha] = useState(null);
  const [formData, setFormData] = useState({ 
    fecha: '', 
    hora: '', 
    duracion: 1,
    serviciosAdicionales: {
      indumentaria: false,
      buffet: false,
      arbitro: false,
      pelota: false
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCancha = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/canchas/${id}`);
        setCancha(response.data);
      } catch (err) {
        setError('Error al cargar la cancha');
      } finally {
        setLoading(false);
      }
    };

    fetchCancha();
  }, [id]);

  const calcularPrecioTotal = () => {
    if (!cancha) return 0;
    let total = cancha.precioBase * formData.duracion;
    
    if (cancha.instalaciones?.duchas) total += 500 * formData.duracion;
    if (formData.serviciosAdicionales.indumentaria && cancha.servicios?.indumentaria?.disponible) {
      total += cancha.servicios.indumentaria.precio;
    }
    if (formData.serviciosAdicionales.buffet && cancha.servicios?.buffet?.disponible) {
      total += cancha.servicios.buffet.precio;
    }
    if (formData.serviciosAdicionales.arbitro && cancha.servicios?.arbitro?.disponible) {
      total += cancha.servicios.arbitro.precio;
    }
    if (formData.serviciosAdicionales.pelota && cancha.servicios?.pelota?.disponible) {
      total += cancha.servicios.pelota.precio;
    }
    
    if (cancha.promocion?.activa) {
      total = total * (1 - cancha.promocion.descuento / 100);
    }
    
    return Math.round(total);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (servicio) => {
    setFormData({
      ...formData,
      serviciosAdicionales: {
        ...formData.serviciosAdicionales,
        [servicio]: !formData.serviciosAdicionales[servicio]
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      navigate('/login');
      return;
    }

    setError('');
    setSuccess('');

    try {
      await axios.post(
        'http://localhost:5000/api/reservas',
        { canchaId: id, ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('¡Reserva realizada exitosamente! Revisa tu email.');
      setFormData({ fecha: '', hora: '', duracion: 1, serviciosAdicionales: { indumentaria: false, buffet: false, arbitro: false, pelota: false } });
      setTimeout(() => navigate('/mis-reservas'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al realizar la reserva');
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (!cancha) return <div className="error">Cancha no encontrada</div>;

  return (
    <div className="cancha-detalle">
      <div className="detalle-container">
        <div className="detalle-image-section">
          <img src={cancha.imagen} alt={cancha.nombre} className="detalle-image" />
          {cancha.promocion?.activa && (
            <div className="promo-banner">
              <h4>🎉 {cancha.promocion.nombre}</h4>
              <p>{cancha.promocion.descripcion}</p>
            </div>
          )}
        </div>
        
        <div className="detalle-info">
          <h1>{cancha.nombre}</h1>
          <p className="detalle-tipo">🎾 {cancha.tipo}</p>
          
          <div className="instalaciones-section">
            <h3>Instalaciones</h3>
            <div className="instalaciones-list">
              {cancha.instalaciones?.vestidores && <span>✅ Vestidores</span>}
              {cancha.instalaciones?.duchas && <span>✅ Duchas</span>}
              {cancha.instalaciones?.estacionamiento && <span>✅ Estacionamiento</span>}
              {cancha.instalaciones?.iluminacion && <span>✅ Iluminación</span>}
            </div>
          </div>

          <div className="precio-base">
            <span>Precio base:</span>
            <strong>${cancha.precioBase}/hora</strong>
            {cancha.instalaciones?.duchas && <small>+ $500/hora (duchas premium)</small>}
          </div>
          
          {user ? (
            <form onSubmit={handleSubmit} className="reserva-form">
              <h3>Realizar Reserva</h3>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
              
              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Hora</label>
                <select name="hora" value={formData.hora} onChange={handleChange} required>
                  <option value="">Selecciona una hora</option>
                  {[...Array(14)].map((_, i) => {
                    const hora = i + 8;
                    return <option key={hora} value={`${hora}:00`}>{hora}:00</option>;
                  })}
                </select>
              </div>

              <div className="form-group">
                <label>Duración (horas)</label>
                <select name="duracion" value={formData.duracion} onChange={handleChange}>
                  {[1, 2, 3, 4].map(h => <option key={h} value={h}>{h} hora{h > 1 ? 's' : ''}</option>)}
                </select>
              </div>

              <div className="servicios-section">
                <h4>Servicios Adicionales</h4>
                {cancha.servicios?.indumentaria?.disponible && (
                  <label className="service-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.serviciosAdicionales.indumentaria}
                      onChange={() => handleServiceChange('indumentaria')}
                    />
                    <span>Indumentaria (+${cancha.servicios.indumentaria.precio})</span>
                  </label>
                )}
                {cancha.servicios?.buffet?.disponible && (
                  <label className="service-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.serviciosAdicionales.buffet}
                      onChange={() => handleServiceChange('buffet')}
                    />
                    <span>Buffet (+${cancha.servicios.buffet.precio})</span>
                  </label>
                )}
                {cancha.servicios?.arbitro?.disponible && (
                  <label className="service-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.serviciosAdicionales.arbitro}
                      onChange={() => handleServiceChange('arbitro')}
                    />
                    <span>Árbitro (+${cancha.servicios.arbitro.precio})</span>
                  </label>
                )}
                {cancha.servicios?.pelota?.disponible && (
                  <label className="service-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.serviciosAdicionales.pelota}
                      onChange={() => handleServiceChange('pelota')}
                    />
                    <span>Pelota (+${cancha.servicios.pelota.precio})</span>
                  </label>
                )}
              </div>

              <div className="precio-total">
                <span>Total a pagar:</span>
                <strong>${calcularPrecioTotal()}</strong>
                {cancha.promocion?.activa && <small className="descuento-aplicado">✨ Descuento aplicado: {cancha.promocion.descuento}%</small>}
              </div>
              
              <button type="submit" className="btn-submit">Confirmar Reserva</button>
            </form>
          ) : (
            <div className="login-prompt">
              <p>Debes iniciar sesión para reservar</p>
              <button onClick={() => navigate('/login')} className="btn-submit">
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CanchaDetalle;
