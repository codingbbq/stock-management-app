import { getAllProducts } from '@/service/product';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Modal from '../Modal';
import Edit from '@/components/Products/edit';
import { useAuth } from '@/lib/AuthContext';
import History from './history';
import { formatDate } from '@/helper/formatdata';

const AllProducts = () => {
	const { isLoggedIn } = useAuth();

	const [products, setProducts] = useState<DocumentData[]>([]);
	const [loading, setLoading] = useState(true);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({}); // State for the selected product

	const handleEditClick = (product: DocumentData) => {
		setSelectedProduct(product); // Set the selected product
		setIsEditModalOpen(true); // Open the modal
	};

    const handleViewHistory = (product: DocumentData) => {
        setSelectedProduct(product); // Set the selected product
        setIsHistoryModalOpen(true); // Open the history modal
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

	if (loading) {
		return <p>Loading products...</p>;
	}

	return (
		<>
			<div className='block text-right p-6 space-x-3'>
				<button
					type='button'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					Add Product
				</button>
			</div>
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
									{formatDate(product.updatedAt)}
								</td>
								{isLoggedIn && (
									<td className='px-6 py-4 text-right'>
										<a
											href='#'
											onClick={(e) => {
												e.preventDefault(); // Prevent default link behavior
												handleEditClick(product); // Open the modal
											}}
											className='mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											Edit
										</a>

                                        <a
											href='#'
											onClick={(e) => {
												e.preventDefault(); // Prevent default link behavior
												handleViewHistory(product); // Open the modal
											}}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											History
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

                <Modal title='View History' isOpen={isHistoryModalOpen} onClose={handleCloseModal}>
					<History product={selectedProduct} />
				</Modal>
			</div>
		</>
	);
};

export default AllProducts;
