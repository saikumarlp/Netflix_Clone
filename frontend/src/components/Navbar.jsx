import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Search } from 'lucide-react';

const Navbar = ({ searchTerm, setSearchTerm, onSearch }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
                }`}
        >
            <div className='px-4 md:px-12 py-4 flex items-center justify-between'>
                <div className='flex items-center gap-8'>
                    <Link to='/'>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                            alt="Netflix"
                            className="h-6 md:h-8"
                        />
                    </Link>
                    <div className='hidden md:flex gap-4 text-sm text-gray-300'>
                        <Link to='/' className='hover:text-white transition'>Home</Link>
                        <Link to='/' className='hover:text-white transition'>TV Shows</Link>
                        <Link to='/' className='hover:text-white transition'>Movies</Link>
                        <Link to='/' className='hover:text-white transition'>New & Popular</Link>
                    </div>
                </div>

                <div className='flex items-center gap-6'>
                    {/* Search Bar */}
                    <form onSubmit={onSearch} className='relative hidden sm:block'>
                        <input
                            type='text'
                            placeholder='Titles, people, genres'
                            className={`bg-black/40 border ${isScrolled ? 'border-gray-600' : 'border-white'} text-white text-sm pl-8 pr-4 py-1.5 rounded-sm focus:outline-none focus:bg-black/60 transition-all w-60`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className='absolute left-2 top-2 text-gray-400' size={16} />
                    </form>

                    <div className='flex items-center gap-4 text-sm font-medium text-white'>
                        <div className='group relative flex items-center gap-2 cursor-pointer'>
                            <div className='w-8 h-8 rounded bg-red-600 flex items-center justify-center overflow-hidden'>
                                <span className='font-bold text-white'>{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                            </div>

                            {/* Dropdown using CSS hover group */}
                            <div className='absolute top-full right-0 mt-2 w-48 bg-black border border-gray-700 rounded shadow-xl py-2 hidden group-hover:block'>
                                <div className='px-4 py-2 hover:bg-gray-800 text-sm text-gray-300 transition'>Manage Profiles</div>
                                <div className='px-4 py-2 hover:bg-gray-800 text-sm text-gray-300 transition'>Account</div>
                                <div className='px-4 py-2 hover:bg-gray-800 text-sm text-gray-300 transition'>Help Center</div>
                                <div className='border-t border-gray-700 my-1'></div>
                                <button
                                    onClick={handleLogout}
                                    className='w-full text-left px-4 py-2 hover:bg-gray-800 text-sm text-white transition'
                                >
                                    Sign out of Netflix
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
