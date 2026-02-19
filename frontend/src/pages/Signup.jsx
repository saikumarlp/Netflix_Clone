import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/signup', formData);
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/');
        } catch (err) {
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : 'Something went wrong'
            );
        }
    };

    return (
        <div className='w-full h-screen relative'>
            <img
                className='hidden sm:block absolute w-full h-full object-cover'
                src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
                alt='netflix'
            />
            <div className='bg-black/50 fixed top-0 left-0 w-full h-screen'></div>

            {/* Navbar Logo for Signup Page */}
            <div className='fixed top-0 w-full p-4 z-50'>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    alt="Netflix"
                    className="h-8 md:h-12 cursor-pointer"
                    onClick={() => navigate('/')}
                />
            </div>

            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 backdrop-blur-md rounded-lg text-white shadow-2xl'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold mb-6'>Sign Up</h1>
                        {error && <p className='p-3 bg-orange-500 text-white rounded my-2 text-sm font-medium'>{error}</p>}

                        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                            <div className='relative my-2'>
                                <input
                                    onChange={handleChange}
                                    className='p-3 w-full bg-[#333] rounded focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-gray-500 text-white placeholder-gray-400 transition'
                                    type='text'
                                    placeholder='Username'
                                    name='name'
                                    value={name}
                                />
                            </div>
                            <div className='relative my-2'>
                                <input
                                    onChange={handleChange}
                                    className='p-3 w-full bg-[#333] rounded focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-gray-500 text-white placeholder-gray-400 transition'
                                    type='email'
                                    placeholder='Email or phone number'
                                    name='email'
                                    value={email}
                                />
                            </div>
                            <div className='relative my-2'>
                                <input
                                    onChange={handleChange}
                                    className='p-3 w-full bg-[#333] rounded focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-gray-500 text-white placeholder-gray-400 transition'
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                />
                            </div>
                            <button className='bg-red-600 py-3 my-6 rounded font-bold hover:bg-red-700 transition duration-300'>
                                Sign Up
                            </button>

                            <div className='flex justify-between items-center text-sm text-gray-400'>
                                <p className='flex items-center'>
                                    <input className='mr-2 accent-gray-500' type='checkbox' />
                                    Remember me
                                </p>
                                <p className='hover:underline cursor-pointer'>Need Help?</p>
                            </div>

                            <div className='mt-10'>
                                <p className='py-4 text-gray-400'>
                                    Already subscribed to Netflix?{' '}
                                    <Link to='/login' className='text-white hover:underline font-medium'>
                                        Sign In now.
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
