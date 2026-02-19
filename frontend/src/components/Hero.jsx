import { Play, Info } from 'lucide-react';

const Hero = () => {
    return (
        <div className='relative h-[65vh] w-full text-white'>
            <div className='absolute w-full h-[65vh] bg-gradient-to-r from-black'>
                <img
                    src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
                    alt='Hero Background'
                    className='w-full h-full object-cover opacity-50'
                />
            </div>

            <div className='absolute top-[30%] p-4 md:p-8 space-y-4 max-w-2xl'>
                <h1 className='text-3xl md:text-5xl font-bold'>Unlimited Movies, TV Shows, and More</h1>
                <p className='text-gray-300 text-lg'>
                    Watch anywhere. Cancel anytime.
                </p>

                <div className='flex gap-4'>
                    <button className='flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition'>
                        <Play size={20} fill='black' /> Play
                    </button>
                    <button className='flex items-center gap-2 bg-gray-500 bg-opacity-70 text-white px-6 py-2 rounded font-bold hover:bg-opacity-50 transition'>
                        <Info size={20} /> More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
