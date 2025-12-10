import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CanchaCard from '../components/CanchaCard';
import './Canchas.css';

const Canchas = () => {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/canchas`);
        setCanchas(response.data);
      } catch (err) {
        setError('Error al cargar las canchas');
      } finally {
        setLoading(false);
      }
    };

    fetchCanchas();
  }, []);

  if (loading) {
    return <div className="loading">Cargando canchas...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="canchas-page">
      <h1>Canchas Disponibles</h1>
      <div className="canchas-grid">
        {canchas.map(cancha => (
          <CanchaCard key={cancha._id} cancha={cancha} />
        ))}
      </div>
    </div>
  );
};

export default Canchas;
