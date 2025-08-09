import { getAllProducts } from '@/service/product';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Modal from '../Modal';
import Edit from '@/components/Products/edit';
import { useAuth } from '@/lib/AuthContext';
import History from './history';
import { formatDate } from '@/helper/formatdata';
import AddProduct from './add';
import { useWithLoader } from '@/helper/withLoader';
import { deleteProduct } from '@/service/product';

const AllProducts = () => {
	const { isLoggedIn } = useAuth();

	const [products, setProducts] = useState<DocumentData[]>([]);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<DocumentData | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	const withLoader = useWithLoader();

	const handleEditClick = (product: DocumentData) => {
		setSelectedProduct(product);
		setIsEditModalOpen(true);
	};

	const handleViewHistory = (product: DocumentData) => {
		setSelectedProduct(product);
		setIsHistoryModalOpen(true);
	};

	const handleAddProduct = () => {
		setIsAddModalOpen(true);
	};

	const handleProductDelete = async (product: DocumentData) => {
		await withLoader('Deleting product', async () => {
			await deleteProduct(product.id);
			fetchProducts();
			console.log(`Product ${product.id} deleted successfully.`);
		});
	};

	const handleCloseModal = () => {
		setIsEditModalOpen(false);
		setIsHistoryModalOpen(false);
		setIsAddModalOpen(false);
		setSelectedProduct(null);
	};

	const handleOnSuccess = () => {
		handleCloseModal();
		fetchProducts();
	};

	const fetchProducts = async () => {
		await withLoader('Fetching Product', async () => {
			try {
				const productsList = await getAllProducts();
				setProducts(productsList);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	// 2. Filter products based on search term (case-insensitive)
	const filteredProducts = products.filter(
		(product) =>
			(product.product_code?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
			(product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<div className='w-full flex items-center justify-between gap-3 mb-4'>
				<input
					id='search'
					type='text'
					placeholder='Search by code or name...'
					className={`px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200
            		${isLoggedIn ? 'w-full sm:w-2/3' : 'w-full'}`}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				{isLoggedIn && (
					<button
						type='button'
						className='hidden sm:block ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						onClick={handleAddProduct}
						style={{ height: '40px' }} // Optional: force consistent height
					>
						Add Product
					</button>
				)}
			</div>

			{/* Desktop: Table look using grid/flex, Mobile: Cards */}
			<div className='w-full px-4 py-3 my-3 rounded-lg shadow-md'>
				{/* Header row for desktop */}
				<div className='hidden sm:grid grid-cols-6 bg-gray-100 font-semibold text-gray-700 px-4 py-2 rounded-t-lg'>
					<div className='col-span-1'>Image</div>
					<div className='col-span-1'>Code</div>
					<div className='col-span-1'>Name</div>
					<div className='col-span-1'>Quantity</div>
					<div className='col-span-1'>Updated At</div>
					{isLoggedIn && <div className='col-span-1'>Actions</div>}
				</div>
				<div className='divide-y divide-gray-200'>
					{filteredProducts.map((product, idx) => (
						// Desktop: grid row, Mobile: card
						<div
							key={product.id || idx}
							className='flex flex-col sm:grid sm:grid-cols-6 bg-white items-center px-4 py-3'
						>
							{/* Image */}
							<div className='flex items-center mb-2 sm:mb-0'>
								<img
									src={product.img || ''}
									alt={product.name}
									className='w-20 h-20 object-cover rounded'
								/>
							</div>
							{/* Code */}
							<div className='text-gray-900 font-medium mb-1 sm:mb-0 flex items-center'>
								{product.product_code}
							</div>
							{/* Name */}
							<div className='text-gray-700 mb-1 sm:mb-0 flex items-center'>
								{product.name}
							</div>
							{/* Quantity */}
							<div className='text-gray-500 mb-1 sm:mb-0 flex items-center'>
								{product.quantity}
							</div>
							{/* Updated At */}
							<div className='text-gray-500 mb-1 sm:mb-0 flex items-center'>
								{formatDate(product.updatedAt)}
							</div>
							{/* Actions */}
							{isLoggedIn && (
								<div className='gap-3 hidden sm:flex'>
									<button
										onClick={() => handleEditClick(product)}
										className='text-blue-600 hover:underline text-sm'
									>
										Edit
									</button>
									<button
										onClick={() => handleViewHistory(product)}
										className='text-blue-600 hover:underline text-sm'
									>
										History
									</button>
									<button
										onClick={() => handleProductDelete(product)}
										className='text-red-600 hover:underline text-sm'
									>
										Delete
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<Modal title='Edit Product' isOpen={isEditModalOpen} onClose={handleCloseModal}>
				{selectedProduct && <Edit product={selectedProduct} onSuccess={handleOnSuccess} />}
			</Modal>

			<Modal
				title={selectedProduct?.name}
				isOpen={isHistoryModalOpen}
				onClose={handleCloseModal}
			>
				<History product={selectedProduct} />
			</Modal>

			<Modal title='Add Product' isOpen={isAddModalOpen} onClose={handleCloseModal}>
				<AddProduct onSuccess={handleOnSuccess} />
			</Modal>
		</>
	);
};

export default AllProducts;
