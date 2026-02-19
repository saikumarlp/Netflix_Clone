import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import Row from '../components/Row';
import api from '../services/api';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchMovies = useCallback(async (query) => {
        setLoading(true);
        try {
            const res = await api.get(`/movies/search?query=${query}`);
            if (res.data.Search) {
                setMovies(res.data.Search);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial check for user
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovies(searchTerm);
    };

    // Debounce search effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                fetchMovies(searchTerm);
            } else {
                setMovies([]); // Clear movies if search is cleared
            }
        }, 800);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, fetchMovies]);

    return (
        <div className='bg-black min-h-screen text-white pb-20'>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />

            {/* Show Hero only when not searching */}
            {!searchTerm && <Hero onSelect={setSelectedMovie} />}

            <div className={`px-4 md:px-12 ${!searchTerm ? '-mt-20 relative z-10' : 'pt-24'} space-y-2 pb-12`}>

                {searchTerm ? (
                    /* Search Results Grid */
                    <div>
                        <h2 className='text-2xl font-bold mb-4'>Search Results for "{searchTerm}"</h2>
                        {loading ? (
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className='aspect-[2/3] w-full bg-gray-800 rounded-md animate-pulse'></div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {movies.length > 0 ? (
                                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                                        {movies.map((movie) => (
                                            <MovieCard
                                                key={movie.imdbID}
                                                movie={movie}
                                                onSelect={setSelectedMovie}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-gray-400 text-center mt-10 text-xl'>No movies found matching your search.</p>
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    /* Category Rows */
                    <div className='space-y-4'>
                        <Row title="Trending Now" fetchQuery="2024" onSelect={setSelectedMovie} />
                        <Row title="Top Rated" fetchQuery="award" onSelect={setSelectedMovie} />
                        <Row title="Action Movies" fetchQuery="action" onSelect={setSelectedMovie} />
                        <Row title="Comedy Movies" fetchQuery="comedy" onSelect={setSelectedMovie} />
                        <Row title="Horror Movies" fetchQuery="horror" onSelect={setSelectedMovie} />
                        <Row title="Romance Movies" fetchQuery="romance" onSelect={setSelectedMovie} />
                        <Row title="Sci-Fi & Fantasy" fetchQuery="space" onSelect={setSelectedMovie} />
                    </div>
                )}
            </div>

            <MovieModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </div>
    );
};

export default Home;
