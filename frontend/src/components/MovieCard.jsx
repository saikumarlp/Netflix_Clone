import { motion } from 'framer-motion';

const MovieCard = ({ movie, onSelect }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='relative cursor-pointer rounded-md overflow-hidden transition-all duration-300'
            onClick={() => onSelect(movie)}
        >
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                alt={movie.Title}
                className='w-full h-auto object-cover'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 opacity-0 hover:opacity-100 transition-opacity duration-300'>
                <h3 className='text-white text-sm font-semibold truncate'>{movie.Title}</h3>
                <p className='text-gray-300 text-xs'>{movie.Year}</p>
            </div>
        </motion.div>
    );
};

export default MovieCard;
