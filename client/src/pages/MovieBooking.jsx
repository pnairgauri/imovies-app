import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function MovieBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load movie details');
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await API.post('/bookings', {
        movieId: id,
        seats: Number(seats),
        userId: user._id
      });
      alert('Booking successful!');
      navigate('/bookings');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>Loading...</div>;
  if (!movie) return <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>Movie not found</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '2rem', backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', display: 'flex', gap: '2rem' }}>
      <img src={movie.image} alt={movie.title} style={{ width: '250px', height: '350px', objectFit: 'cover', borderRadius: '0.5rem' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '0.5rem' }}>{movie.title}</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>{movie.genre} • {movie.duration} mins</p>
          <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>{movie.description}</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Price per ticket: ${movie.ticketPrice}</p>
        </div>

        {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: '#94a3b8' }}>Number of Seats</label>
            <input
              type="number"
              min="1"
              max="10"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', color: '#f8fafc' }}
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Confirm Booking (${movie.ticketPrice * seats})
          </button>
        </form>
      </div>
    </div>
  );
}

export default MovieBooking;