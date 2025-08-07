import React, { useState } from 'react';
import { addProduct, addProductHistory } from '@/service/product';
import { uploadImageToFirebase } from '@/service/uploadImage';

const AddProductForm: React.FC = () => {
	const [productCode, setProductCode] = useState('');
	const [productName, setProductName] = useState('');
	const [productImage, setProductImage] = useState<File | null>(null);
	const [initialQuantity, setInitialQuantity] = useState<number>(0);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProductImage(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			let imgURL = '';
			if (productImage) {
				// Upload the image to Firebase Storage
				imgURL = await uploadImageToFirebase(productImage, 'products');
			}
			const now = new Date().getTime(); // Current timestamp in milliseconds

			// Add the product to Firestore
			const productId = await addProduct({
				img: imgURL,
				product_code: productCode,
				name: productName,
				quantity: initialQuantity,
				updatedAt: now, // Current timestamp in milliseconds
			});

			// Also add product History for first instance.
			let history = {
				action: 'added',
				quantity: initialQuantity,
				comment: 'Initial stock',
				timestamp: now,
			};

			await addProductHistory(productId, history);

			setSuccess(`Product added successfully with ID: ${productId}`);
			setError('');

			// Reset form fields
			setProductCode('');
			setProductName('');
			setProductImage(null);
			setInitialQuantity(0);
		} catch (err) {
			setError('Error adding product. Please try again.');
			setSuccess('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='p-6 space-y-6 bg-white shadow-md rounded-lg'>
			{/* Product Code */}
			<div>
				<label htmlFor='product-code' className='block mb-2 text-sm font-medium'>
					Product Code
				</label>
				<input
					type='text'
					id='product-code'
					value={productCode}
					onChange={(e) => setProductCode(e.target.value)}
					required
					className='block w-full px-3 py-2 border rounded-md'
				/>
			</div>

			{/* Product Name */}
			<div>
				<label htmlFor='product-name' className='block mb-2 text-sm font-medium'>
					Product Name
				</label>
				<input
					type='text'
					id='product-name'
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
					required
					className='block w-full px-3 py-2 border rounded-md'
				/>
			</div>

			{/* Product Image */}
			<div>
				<label htmlFor='product-image' className='block mb-2 text-sm font-medium'>
					Product Image
				</label>
				<input
					type='file'
					id='product-image'
					accept='image/*'
					onChange={handleImageUpload}
					className='block w-full text-sm text-gray-900 border rounded-lg cursor-pointer'
				/>
			</div>

			{/* Initial Quantity */}
			<div>
				<label htmlFor='initial-quantity' className='block mb-2 text-sm font-medium'>
					Initial Quantity
				</label>
				<input
					type='number'
					id='initial-quantity'
					value={initialQuantity}
					onChange={(e) => setInitialQuantity(Number(e.target.value))}
					required
					className='block w-full px-3 py-2 border rounded-md'
				/>
			</div>

			{/* Submit Button */}
			<div className='flex justify-end'>
				<button type='submit' className='px-4 py-2 text-white bg-indigo-600 rounded-md'>
					Add Product
				</button>
			</div>

			{/* Success/Error Messages */}
			{success && <p className='text-green-600'>{success}</p>}
			{error && <p className='text-red-600'>{error}</p>}
		</form>
	);
};

export default AddProductForm;
