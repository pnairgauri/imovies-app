const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  posterUrl: { type: String },
  ticketPrice: { type: Number, required: true },
  showtimes: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);