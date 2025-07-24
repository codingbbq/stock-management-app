import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };

    return (
        <section className='flex items-center justify-center px-8 mt-20 sm:mt-32 md:mt-40'>
            <div className='w-full max-w-sm bg-white shadow-md rounded-lg'>
                <div className='p-6'>
                    <h2 className='text-2xl font-semibold'>Login</h2>
                    <p className='mt-2 text-sm text-gray-600'>
                        Enter your email below to login to your account.
                    </p>
                </div>
                <div className='p-6 space-y-4'>
                    <div className='space-y-2'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            placeholder='m@example.com'
                            required
                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            required
                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                </div>
                <div className='p-6'>
                    <button
                        className='w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Login;
