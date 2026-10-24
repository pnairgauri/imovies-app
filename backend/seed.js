const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');

dotenv.config();

const sampleMovies = [
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.',
    genre: 'Sci-Fi',
    duration: 169,
    ticketPrice: 12,
    image: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg'
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.',
    genre: 'Action',
    duration: 152,
    ticketPrice: 15,
    image: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg'
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task.',
    genre: 'Sci-Fi',
    duration: 148,
    ticketPrice: 14,
    image: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/imovies')
  .then(async () => {
    console.log('MongoDB Connected for Seeding...');
    await Movie.deleteMany({});
    await Movie.insertMany(sampleMovies);
    console.log('Sample Movies Updated Successfully!');
    process.exit();
  })
  .catch((err) => {
    console.error('Seeding Error:', err);
    process.exit(1);
  });