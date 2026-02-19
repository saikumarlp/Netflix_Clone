import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MovieModal = ({ movie, onClose }) => {
    if (!movie) return null;

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
                        className='absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition'
                    >
                        <X size={24} />
                    </button>

                    <div className='flex flex-col md:flex-row'>
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                            alt={movie.Title}
                            className='w-full md:w-1/3 object-cover h-[400px] md:h-auto'
                        />

                        <div className='p-6 md:p-8 space-y-4 flex-1'>
                            <h2 className='text-3xl font-bold'>{movie.Title}</h2>
                            <div className='flex items-center gap-4 text-gray-400 text-sm'>
                                <span>{movie.Year}</span>
                                <span>{movie.Type}</span>
                            </div>

                            <p className='text-gray-300 leading-relaxed'>
                                {/* OMDB Search endpoint doesn't return Plot by default, would need to fetch details. 
                    For now, showing placeholder or basic info available. */}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>

                            <div className='pt-4'>
                                <button className='bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition'>
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MovieModal;
