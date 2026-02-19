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
        <div className='w-full h-screen'>
            <img
                className='hidden sm:block absolute w-full h-full object-cover'
                src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
                alt='netflix'
            />
            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold'>Sign Up</h1>
                        {error && <p className='p-3 bg-red-500 my-2'>{error}</p>}
                        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                            <input
                                onChange={handleChange}
                                className='p-3 my-2 bg-gray-700 rounded'
                                type='text'
                                placeholder='Name'
                                name='name'
                                value={name}
                            />
                            <input
                                onChange={handleChange}
                                className='p-3 my-2 bg-gray-700 rounded'
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={email}
                            />
                            <input
                                onChange={handleChange}
                                className='p-3 my-2 bg-gray-700 rounded'
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={password}
                            />
                            <button className='bg-red-600 py-3 my-6 rounded font-bold hover:bg-red-700 transition'>
                                Sign Up
                            </button>
                            <div className='flex justify-between items-center text-sm text-gray-600'>
                                <p>
                                    <input className='mr-2' type='checkbox' />
                                    Remember me
                                </p>
                                <p>Need Help?</p>
                            </div>
                            <p className='py-8'>
                                <span className='text-gray-600'>
                                    Already subscribed to Netflix?
                                </span>{' '}
                                <Link to='/login'>Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
