import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const MovieModal = ({ movie, onClose }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (movie) {
            const fetchDetails = async () => {
                setLoading(true);
                try {
                    const res = await api.get(`/movies/${movie.imdbID}`);
                    if (res.data && !res.data.Error) {
                        setDetails(res.data);
                    } else {
                        setDetails(movie);
                    }
                } catch (error) {
                    console.error('Error fetching details:', error);
                    setDetails(movie);
                } finally {
                    setLoading(false);
                }
            };
            fetchDetails();

            // ESC key listener
            const handleEsc = (e) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        } else {
            setDetails(null);
        }
    }, [movie, onClose]);

    if (!movie) return null;

    // Use details if available, otherwise fallback to basic movie info
    const displayMovie = details || movie;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4'
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className='bg-zinc-900 text-white rounded-lg shadow-xl max-w-3xl w-full overflow-hidden relative'
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className='absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition z-10'
                    >
                        <X size={24} />
                    </button>

                    {loading ? (
                        <div className="h-[400px] flex items-center justify-center">
                            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600'></div>
                        </div>
                    ) : (
                        <div className='flex flex-col md:flex-row'>
                            <img
                                src={displayMovie.Poster !== 'N/A' ? displayMovie.Poster : 'https://via.placeholder.com/300x450'}
                                alt={displayMovie.Title}
                                className='w-full md:w-1/3 object-cover h-[400px] md:h-auto'
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                                }}
                            />

                            <div className='p-6 md:p-8 space-y-4 flex-1'>
                                <h2 className='text-3xl font-bold'>{displayMovie.Title}</h2>
                                <div className='flex items-center gap-4 text-gray-400 text-sm'>
                                    <span>{displayMovie.Year}</span>
                                    <span>{displayMovie.Type ? displayMovie.Type.toUpperCase() : 'MOVIE'}</span>
                                    {displayMovie.Rated && <span className="border border-gray-500 px-1 text-xs">{displayMovie.Rated}</span>}
                                    {displayMovie.Runtime && <span>{displayMovie.Runtime}</span>}
                                </div>
                                {displayMovie.Genre && <p className="text-sm text-gray-400">Genre: {displayMovie.Genre}</p>}

                                <p className='text-gray-300 leading-relaxed'>
                                    {displayMovie.Plot !== 'N/A' ? displayMovie.Plot : 'No plot available.'}
                                </p>

                                {displayMovie.Director && <p className="text-sm text-gray-400">Director: {displayMovie.Director}</p>}
                                {displayMovie.Actors && <p className="text-sm text-gray-400">Cast: {displayMovie.Actors}</p>}

                                <div className='pt-4'>
                                    <button className='bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition'>
                                        Play
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MovieModal;
