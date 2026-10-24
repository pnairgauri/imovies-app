import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Film, User, Ticket } from 'lucide-react';
import API from './services/api';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import MovieBooking from './pages/MovieBooking';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/movies')
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="hero">
        <h1>Welcome to IMovies</h1>
        <p>Book your favorite movie tickets instantly!</p>
      </div>

      <div style={{ padding: '0 2rem 4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>Now Showing</h2>
        
        {loading ? (
          <p style={{ color: '#94a3b8', textAlign: 'center' }}>Loading movies...</p>
        ) : movies.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center' }}>No movies available yet. Add some to your database!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {movies.map((movie) => (
              <div key={movie._id} style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
                <div className="poster-container">
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `<div class="poster-fallback"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg><span>${movie.title}</span></div>`;
                    }}
                  />
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{movie.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>{movie.genre} • {movie.duration} mins</p>
                  </div>
                  <Link 
                    to={`/movie/${movie._id}`} 
                    style={{ backgroundColor: '#dc2626', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: 'bold', textAlign: 'center', textDecoration: 'none' }}
                  >
                    Book Tickets
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <Link to="/" className="brand">
          <Film size={28} /> IMovies
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/bookings"><Ticket size={18} /> My Bookings</Link>
          {user ? (
            <button onClick={handleLogout} className="login-btn" style={{ border: 'none', cursor: 'pointer' }}>
              Logout ({user.name || 'User'})
            </button>
          ) : (
            <Link to="/login" className="login-btn"><User size={18} /> Login</Link>
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/movie/:id" element={<MovieBooking />} />
      </Routes>
    </div>
  );
}

export default App;