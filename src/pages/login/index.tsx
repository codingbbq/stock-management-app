import { useAuth } from '@/lib/AuthContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
	const { login } = useAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
    const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(username, password);
            navigate('/', { replace: true }); // Redirect to home after successful login
		
		} catch (err) {
			setError('Invalid username or password');
		}
	};

	return (
		<section className='flex items-center justify-center px-8 mt-20 sm:mt-32 md:mt-40'>
			<form onSubmit={handleLogin}>
				<div className='w-full max-w-sm bg-white shadow-md rounded-lg'>
					<div className='p-6'>
						<h2 className='text-2xl font-semibold'>Login</h2>
						<p className='mt-2 text-sm text-gray-600'>
							Enter your email below to login to your account.
						</p>
					</div>
					<div className='p-6 space-y-4'>
						<div className='space-y-2'>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'
							>
								Email
							</label>
							<input
								id='username'
								type='email'
								placeholder='m@example.com'
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							/>
						</div>
						<div className='space-y-2'>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700'
							>
								Password
							</label>
							<input
								id='password'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							/>
						</div>
					</div>
					<div className='p-6'>
						{error && <p className='error'>{error}</p>}
						<button className='w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
							Login
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default Login;
