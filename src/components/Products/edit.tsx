import { updateProduct, addProductHistory } from '@/service/product';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';

const Edit = ({ product }: { product: DocumentData }) => {
	console.log('Editing product:', product);
	const [img, setImg] = useState(product.img || '');
	const [code, setCode] = useState(product.product_code || '');
	const [name, setName] = useState(product.name || '');
	const [quantity, setQuantity] = useState(product.quantity || 0);
	const [addQuantity, setAddQuantity] = useState(0);
	const [removeQuantity, setRemoveQuantity] = useState(0);
	const [comment, setComment] = useState('');

	const handleAddQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		setAddQuantity(value);
		if (value > 0) {
			setRemoveQuantity(0); // Reset removeQuantity if adding quantity
		}
	};

	const handleRemoveQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		setRemoveQuantity(value);
		if (value > 0) {
			setAddQuantity(0); // Reset addQuantity if removing quantity
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const updatedQuantity = quantity + addQuantity - removeQuantity;

		console.log({
			product_code: code,
			product_name: name,
			updated_quantity: updatedQuantity,
			comment,
		});

		await updateProduct(product.id, {
			code,
			name,
			quantity: updatedQuantity,
		});

		let history = {
			action: '',
			quantity: 0,
			comment: comment || '',
			timestamp: new Date(),
		};
		if(addQuantity > 0) {
			history.action = "added";
			history.quantity = addQuantity;
		} else if(removeQuantity > 0) {
			history.action = "removed";
			history.quantity = removeQuantity;
		}
		
		await addProductHistory(product.id, history);


		// Reset form fields
		setAddQuantity(0);
		setRemoveQuantity(0);
		setComment('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='p-6 space-y-6'>
				{/* Product Information */}
				<div className='grid grid-cols-6 gap-6'>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='product-code'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Product Code
						</label>
						<input
							type='text'
							name='product-code'
							id='product-code'
							value={code}
							onChange={(e) => setCode(e.target.value)} // Handle code change
							disabled
							className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='product-name'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Product Name
						</label>
						<input
							type='text'
							name='product-name'
							id='product-name'
							value={name}
							onChange={(e) => setName(e.target.value)} // Handle name change
							disabled
							className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
						/>
					</div>
				</div>

				{/* Current Quantity */}
				<div>
					<label
						htmlFor='current-quantity'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Current Quantity
					</label>
					<input
						type='number'
						name='current-quantity'
						id='current-quantity'
						value={quantity}
						disabled
						className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
					/>
				</div>

				{/* Add or Remove Quantity */}
				<div className='grid grid-cols-6 gap-6'>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='add-quantity'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Add Quantity
						</label>
						<input
							type='number'
							name='add-quantity'
							id='add-quantity'
							value={addQuantity}
							onChange={handleAddQuantityChange} // Handle add quantity change
							className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label
							htmlFor='remove-quantity'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Remove Quantity
						</label>
						<input
							type='number'
							name='remove-quantity'
							id='remove-quantity'
							value={removeQuantity}
							onChange={handleRemoveQuantityChange} // Handle remove quantity change
							className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
						/>
					</div>
				</div>

				{/* Comment Section */}
				<div>
					<label
						htmlFor='comment'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Comment
					</label>
					<textarea
						name='comment'
						id='comment'
						rows={4}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
						placeholder='Reason for adding or removing quantity...'
					></textarea>
				</div>

				{/* Submit Button */}
				<div className='flex justify-end'>
					<button
						type='submit'
						className='px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Save Changes
					</button>
				</div>
			</div>
		</form>
	);
};

export default Edit;
