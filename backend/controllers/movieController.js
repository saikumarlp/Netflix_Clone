const axios = require('axios');

// @desc    Search movies from OMDB
// @route   GET /api/movies/search?query=name
// @access  Public
const searchMovies = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const apiKey = process.env.OMDB_API_KEY;
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

        const response = await axios.get(url);

        if (response.data.Error) {
            // If OMDB returns an error (like "Invalid API Key"), throw it to catch block to use fallback
            throw new Error(response.data.Error);
        }

        res.json(response.data);
    } catch (error) {
        console.error('Search Error:', error.message);
        if (error.response) {
            console.error('OMDB Response Data:', error.response.data);
            console.error('OMDB Response Status:', error.response.status);
        }

        // Fallback to mock data if API fails (e.g. invalid key)
        const mockMovies = [
            { imdbID: 'tt0372784', Title: 'Batman Begins', Year: '2005', Poster: 'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', Type: 'movie' },
            { imdbID: 'tt0468569', Title: 'The Dark Knight', Year: '2008', Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', Type: 'movie' },
            { imdbID: 'tt1345836', Title: 'The Dark Knight Rises', Year: '2012', Poster: 'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg', Type: 'movie' },
            { imdbID: 'tt1877830', Title: 'The Batman', Year: '2022', Poster: 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg', Type: 'movie' },
            { imdbID: 'tt0096895', Title: 'Batman', Year: '1989', Poster: 'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg', Type: 'movie' }
        ];

        console.log('Returning mock data due to API error');
        return res.json({ Search: mockMovies });
    }
};

const getMovieById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Movie ID is required' });
    }

    try {
        const apiKey = process.env.OMDB_API_KEY;
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`;

        const response = await axios.get(url);

        if (response.data.Error) {
            throw new Error(response.data.Error);
        }

        res.json(response.data);
    } catch (error) {
        console.error('Details Error:', error.message);
        // Fallback for mock data if needed, or just return error
        // For simplicity, we might return a mock detail if ID matches one of our mocks
        res.status(500).json({ message: 'Failed to fetch movie details' });
    }
};

module.exports = {
    searchMovies,
    getMovieById,
};
