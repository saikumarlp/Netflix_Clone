import { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import api from '../services/api';

const Hero = ({ onSelect }) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchRandomMovie = async () => {
            const queries = ['Avengers', 'Batman', 'Spider-Man', 'Inception', 'Interstellar', 'Matrix', 'Joker', 'Iron Man'];
            const randomQuery = queries[Math.floor(Math.random() * queries.length)];

            try {
                const res = await api.get(`/movies/search?query=${randomQuery}`);
                if (res.data.Search && res.data.Search.length > 0) {
                    const validMovies = res.data.Search.filter(m => m.Poster && m.Poster !== 'N/A');

                    if (validMovies.length > 0) {
                        const randomMovieSimple = validMovies[Math.floor(Math.random() * validMovies.length)];

                        // Fetch full details using the ID to get authentic Plot and Rating
                        const detailRes = await api.get(`/movies/${randomMovieSimple.imdbID}`);

                        if (detailRes.data && !detailRes.data.Error) {
                            setMovie(detailRes.data);
                        } else {
                            // If details fail, fallback to simple but acknowledge it's incomplete
                            setMovie(randomMovieSimple);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching hero movie:', error);
            }
        };

        fetchRandomMovie();
    }, []);

    if (!movie) return (
        <div className='relative h-[65vh] w-full bg-black animate-pulse'></div>
    );

    return (
        <div className='relative w-full text-white min-h-[85vh] flex flex-col justify-center'>
            {/* Background Image - Absolute */}
            <div className='absolute inset-0 w-full h-full'>
                <div className='absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10'></div>
                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10'></div>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop'}
                    alt={movie.Title}
                    className='w-full h-full object-cover'
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop';
                    }}
                />
            </div>

            {/* Content - Relative/Flex to push content down */}
            <div className='relative z-20 px-4 md:px-12 w-full max-w-3xl pt-[20vh] pb-12 space-y-4'>
                <h1 className='text-4xl md:text-6xl font-black drop-shadow-lg tracking-tight leading-tight'>
                    {movie.Title}
                </h1>

                <div className='flex items-center gap-4 text-sm md:text-base'>
                    <span className='text-green-400 font-bold'>
                        {movie.imdbRating ? `${movie.imdbRating} Match` : '98% Match'}
                    </span>
                    <span className='text-gray-300'>{movie.Year}</span>
                    <span className='border border-gray-400 px-1 text-xs text-gray-400 rounded-sm'>
                        {movie.Type ? movie.Type.toUpperCase() : 'MOVIE'}
                    </span>
                </div>

                <p className='text-gray-200 text-base md:text-lg drop-shadow-md line-clamp-3 font-medium leading-relaxed max-w-xl'>
                    {movie.Plot !== 'N/A' ? movie.Plot : ''}
                </p>

                <div className='flex gap-4 mt-6'>
                    <button className='flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition transform hover:scale-105'>
                        <Play size={24} fill='black' /> Play
                    </button>
                    <button
                        onClick={() => onSelect && onSelect(movie)}
                        className='flex items-center gap-2 bg-gray-500/70 text-white px-6 py-2 rounded font-bold hover:bg-gray-500/50 transition transform hover:scale-105'
                    >
                        <Info size={24} /> More Info
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Hero;
