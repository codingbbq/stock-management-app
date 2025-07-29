import { getAllProducts } from '@/firebase/services';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Modal from '../Modal';
import Edit from '@/components/Products/edit';

const AllProducts = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
	const [products, setProducts] = useState<DocumentData[]>([]);
	const [loading, setLoading] = useState(true);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({}); // State for the selected product

	const handleEditClick = (product: DocumentData) => {
		setSelectedProduct(product); // Set the selected product
		setIsEditModalOpen(true); // Open the modal
	};

	const handleCloseModal = () => {
		setIsEditModalOpen(false); // Close the modal
		setSelectedProduct({}); // Clear the selected product
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productsList = await getAllProducts();
				setProducts(productsList);
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// Show Readable Date Format
	const formatDate = (timestamp: number) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	if (loading) {
		return <p>Loading products...</p>;
	}

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th
							scope='col'
							className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
						>
							Image
						</th>
						<th
							scope='col'
							className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
						>
							Product Code
						</th>
						<th
							scope='col'
							className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
						>
							Product Name
						</th>
						<th
							scope='col'
							className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
						>
							Stock
						</th>
						<th
							scope='col'
							className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
						>
							Updated At
						</th>
						{isLoggedIn && (
							<th
								scope='col'
								className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
							>
								<span className='sr-only'>Actions</span>
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{products.map((product, idx) => (
						<tr
							key={product.id || idx}
							className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
						>
							<td className='px-6 py-4'>
								<img
									src={product.img || ''}
									width={100}
									height={100}
									alt=''
									className='rounded'
								/>
							</td>
							<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
								{product.product_code}
							</td>
							<td className='px-6 py-4'>{product.name}</td>
							<td className='px-6 py-4'>{product.quantity}</td>
							<td className='px-6 py-4'>
								{formatDate(product.updatedAt.seconds)}{' '}
								{/* Convert seconds to readable date */}
							</td>
                            { isLoggedIn && (
							<td className='px-6 py-4 text-right'>
								<a
									href='#'
									onClick={(e) => {
										e.preventDefault(); // Prevent default link behavior
										handleEditClick(product); // Open the modal
									}}
									className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
								>
									Edit
								</a>
							</td>
                            )}
						</tr>
					))}
				</tbody>
			</table>

			<Modal title='Edit Product' isOpen={isEditModalOpen} onClose={handleCloseModal}>
				<Edit product={selectedProduct} />
			</Modal>
		</div>
	);
};

export default AllProducts;
