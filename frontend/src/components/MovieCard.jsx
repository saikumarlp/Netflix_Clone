import { motion } from 'framer-motion';

const MovieCard = ({ movie, onSelect }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.1, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            className='relative cursor-pointer rounded-md overflow-hidden transition-all duration-300 shadow-black hover:shadow-2xl'
            onClick={() => onSelect(movie)}
        >
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movie.Title}
                className='w-full aspect-[2/3] object-cover rounded-md'
                loading="lazy"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                }}
            />

            {/* Overlay Gradient */}
            <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2'>
                <h3 className='text-white text-sm font-bold truncate'>{movie.Title}</h3>
                <div className='flex justify-between items-center text-xs text-gray-300 mt-1'>
                    <span>{movie.Year}</span>
                    <span className='capitalize border border-gray-500 px-1 rounded'>{movie.Type}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
