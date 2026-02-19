import React from 'react';
import { motion } from 'framer-motion';

const MovieCard = React.memo(({ movie, onSelect, onImageError }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5, zIndex: 10 }}
            transition={{ duration: 0.3 }}
            className='relative cursor-pointer rounded-md overflow-hidden shadow-lg hover:shadow-2xl bg-[#181818]'
            onClick={() => onSelect(movie)}
        >
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/fallback.svg'}
                alt={movie.Title}
                className='w-full h-full object-cover rounded-md'
                style={{ aspectRatio: '2/3' }}
                loading="lazy"
                onError={(e) => {
                    if (onImageError) {
                        onImageError(movie.imdbID);
                    } else {
                        e.target.onerror = null;
                        e.target.src = '/fallback.svg';
                    }
                }}
            />

            {/* Overlay Gradient with Info */}
            <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3'>
                <h3 className='text-white text-sm font-bold truncate leading-tight'>{movie.Title}</h3>
                <div className='flex justify-between items-center text-[10px] text-gray-300 mt-1 font-medium'>
                    <span>{movie.Year}</span>
                    <span className='uppercase border border-gray-500 px-1 rounded-sm'>
                        {movie.Type === 'series' ? 'TV' : 'HD'}
                    </span>
                </div>
            </div>
        </motion.div>
    );
});

export default MovieCard;
