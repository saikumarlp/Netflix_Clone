import { useEffect, useState } from 'react';
import api from '../services/api';
import MovieCard from './MovieCard';

const Row = ({ title, fetchQuery, onSelect }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/movies/search?query=${fetchQuery}`);
                if (res.data.Search) {
                    // Remove duplicates based on imdbID
                    const uniqueMovies = Array.from(new Set(res.data.Search.map(a => a.imdbID)))
                        .map(id => {
                            return res.data.Search.find(a => a.imdbID === id)
                        })
                    setMovies(uniqueMovies);
                }
            } catch (error) {
                console.error(`Error fetching row ${title}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [fetchQuery, title]);

    return (
        <div className='mb-8'>
            <h2 className='text-white font-bold md:text-xl mb-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <div
                    id={'slider' + title}
                    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar relative'
                >
                    {loading ? (
                        /* Skeleton Loading State directly inline for horizontal row */
                        [...Array(6)].map((_, i) => (
                            <div key={i} className='inline-block w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] p-2 align-top first:pl-0'>
                                <div className='w-full aspect-[2/3] bg-zinc-800 rounded-md animate-pulse'></div>
                            </div>
                        ))
                    ) : (
                        movies.map((item) => (
                            <div key={item.imdbID} className='inline-block w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] p-2 cursor-pointer relative align-top first:pl-0'>
                                <MovieCard movie={item} onSelect={onSelect} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Row;
