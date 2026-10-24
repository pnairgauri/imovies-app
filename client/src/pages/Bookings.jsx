import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?._id) {
      API.get(`/bookings/user/${user._id}`)
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Please log in to view your bookings.</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
        My Bookings
      </h2>

      {loading ? (
        <p style={{ color: '#94a3b8' }}>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>You have no movie bookings yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.map((b) => (
            <div key={b._id} style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#ef4444' }}>{b.movie?.title || 'Movie'}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Seats: {b.seats}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem' }}>Booking ID: {b._id}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${b.totalAmount}</p>
                <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>
                  Confirmed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;