const Booking = require('../models/Booking');

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { movieId, showtime, seats, totalPrice, userId } = req.body;

    const newBooking = new Booking({
      user: userId,
      movie: movieId,
      showtime,
      seats,
      totalPrice
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('movie');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};