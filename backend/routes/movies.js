const express = require('express');
const router = express.Router();
const { searchMovies } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

router.get('/search', protect, searchMovies);

module.exports = router;
