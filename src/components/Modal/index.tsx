import React from 'react';

const Modal = ({
  title,
	isOpen,
	onClose,
	children,
}: {
  title?: string;
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}) => {
	if (!isOpen) return null; // Do not render the modal if it's not open

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div  className='w-full max-w-2xl max-h-full relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>
				<div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200'>
					<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
						{title}
					</h3>
					<button
						type='button'
						onClick={onClose}
						className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
						data-modal-hide='editUserModal'
					>
						<svg
							className='w-3 h-3'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 14 14'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
							/>
						</svg>
						<span className='sr-only'>Close modal</span>
					</button>
				</div>

				{/* Modal Content */}
				{children}
			</div>
		</div>
	);
};

export default Modal;
