import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import api from '../services/api';
import { Search } from 'lucide-react';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('Batman');
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

    // Initial check for user and fetch
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        } else {
            // Fetch immediately on mount if searchTerm exists
            if (searchTerm) fetchMovies(searchTerm);
        }
    }, [navigate, fetchMovies]); // fetchMovies is stable now

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovies(searchTerm);
    };

    // Debounce search effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                fetchMovies(searchTerm);
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, fetchMovies]);

    return (
        <div className='bg-black min-h-screen text-white'>
            <Navbar />
            <Hero />

            <div className='px-4 md:px-16 -mt-32 relative z-10 space-y-8 pb-12'>
                {/* Search Bar */}
                <div className='flex justify-end'>
                    <form onSubmit={handleSearch} className='relative w-full md:w-1/3'>
                        <input
                            type='text'
                            placeholder='Search movies...'
                            className='w-full bg-zinc-800 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={20} />
                    </form>
                </div>

                <div>
                    <h2 className='text-2xl font-bold mb-4'>Trending Now</h2>
                    {loading ? (
                        <div className='flex justify-center items-center h-40'>
                            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600'></div>
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
                                <p className='text-gray-400 text-center'>No movies found.</p>
                            )}
                        </>
                    )}
                </div>
            </div>

            <MovieModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </div>
    );
};

export default Home;
