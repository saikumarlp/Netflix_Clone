const express = require('express');
const router = express.Router();
const { searchMovies, getMovieById } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

router.get('/search', protect, searchMovies);
router.get('/:id', protect, getMovieById);

module.exports = router;
