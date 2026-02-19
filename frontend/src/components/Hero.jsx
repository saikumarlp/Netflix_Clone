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
                    const randomMovie = res.data.Search[Math.floor(Math.random() * res.data.Search.length)];
                    setMovie(randomMovie);
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
        <div className='relative h-[65vh] w-full text-white'>
            <div className='absolute w-full h-[65vh]'>
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
            <div className='absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent'></div>
            <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent'></div>

            <div className='absolute top-[20%] md:top-[30%] p-4 md:p-12 space-y-4 max-w-2xl z-20'>
                <h1 className='text-4xl md:text-6xl font-black drop-shadow-lg tracking-tight'>{movie.Title}</h1>
                <div className='text-gray-300 text-lg flex items-center gap-4 font-semibold'>
                    <span className='text-green-400'>98% Match</span>
                    <span>{movie.Year}</span>
                    <span className='border border-gray-400 px-1 text-xs text-gray-400'>{movie.Type ? movie.Type.toUpperCase() : 'MOVIE'}</span>
                </div>
                <p className='text-gray-200 text-base md:text-lg drop-shadow-md line-clamp-3 max-w-xl font-medium leading-relaxed'>
                    {movie.Plot !== 'N/A' ? movie.Plot : `Watch this amazing ${movie.Type} on Netflix. Experience the thrill and excitement of ${movie.Title}.`}
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
