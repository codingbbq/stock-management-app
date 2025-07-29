import { DocumentData } from 'firebase/firestore';

const Edit = ({ product }: { product: DocumentData }) => {
	return (
		<form>
			{/* Modal body */}
			<div className='p-6 space-y-6'>
				<div className='grid grid-cols-6 gap-6'>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='first-name'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							First Name
						</label>
						<input
							type='text'
							name='first-name'
							id='first-name'
							className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Bonnie'
							required
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='last-name'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Last Name
						</label>
						<input
							type='text'
							name='last-name'
							id='last-name'
							className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Green'
							required
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='email'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Email
						</label>
						<input
							type='email'
							name='email'
							id='email'
							className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='example@company.com'
							required
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='phone-number'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Phone Number
						</label>
						<input
							type='number'
							name='phone-number'
							id='phone-number'
							className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='e.g. +(12)3456 789'
							required
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='department'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Department
						</label>
						<input
							type='text'
							name='department'
							id='department'
							className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Development'
							required
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='company'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Company
						</label>
						<input
							type='number'
							name='company'
							id='company'
							className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='123456'
							required
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='current-password'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Current Password
						</label>
						<input
							type='password'
							name='current-password'
							id='current-password'
							className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='••••••••'
							required
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='new-password'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							New Password
						</label>
						<input
							type='password'
							name='new-password'
							id='new-password'
							className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='••••••••'
							required
						/>
					</div>
				</div>
			</div>
			{/*  Modal footer */}
			<div className='flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600'>
				<button
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					Save all
				</button>
			</div>
		</form>
	);
};

export default Edit;
