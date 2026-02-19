import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Search } from 'lucide-react';

const Navbar = () => {
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
            className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'
                }`}
        >
            <div className='px-4 md:px-16 py-4 flex items-center justify-between'>
                <Link to='/'>
                    <h1 className='text-red-600 text-3xl font-bold cursor-pointer'>
                        NETFLIX
                    </h1>
                </Link>

                <div className='flex items-center gap-4'>
                    <button
                        onClick={handleLogout}
                        className='text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
