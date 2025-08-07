import React from 'react';
import { useLoader } from '@/lib/LoaderContext';

const Loader: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
	const { loading } = useLoader();
	if (!loading) return null;
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50'>
			<div className='flex items-center justify-center py-4'>
				<svg
					className='animate-spin h-6 w-6 text-white mr-2'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'
					/>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
					/>
				</svg>
				<span className='text-white font-medium'>{message}</span>
			</div>
		</div>
	);
};

export default Loader;
