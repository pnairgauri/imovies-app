const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, addMovie } = require('../controllers/movieController');

// Route definitions
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', addMovie);

module.exports = router;