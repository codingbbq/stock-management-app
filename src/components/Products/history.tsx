import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase/config';

const History = ({ product }: DocumentData) => {
	const [history, setHistory] = useState<any[]>([]);
	const [currentQuantity, setCurrentQuantity] = useState<number>(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				// Fetch product details to get the current quantity
				const productRef = doc(db, 'products', productId);
				const productSnapshot = await getDoc(productRef);
				if (productSnapshot.exists()) {
					const productData = productSnapshot.data();
					setCurrentQuantity(productData.quantity || 0);
				}

				// Fetch history subcollection
				const historyRef = collection(db, 'products', productId, 'history');
				const historySnapshot = await getDocs(historyRef);
				const historyData = historySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				// Sort history by timestamp (most recent first)
				historyData.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());

				setHistory(historyData);
			} catch (error) {
				console.error('Error fetching history:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchHistory();
	}, [productId]);

	if (loading) {
		return <p className='text-center text-gray-500'>Loading history...</p>;
	}

	return (
		<div className='container mx-auto p-6 max-w-4xl'>
			<h1 className='text-2xl font-bold mb-4 text-gray-800'>Product History</h1>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Date
							</th>
							<th scope='col' className='px-6 py-3'>
								Added Quantity
							</th>
							<th scope='col' className='px-6 py-3'>
								Removed Quantity
							</th>
							<th scope='col' className='px-6 py-3'>
								Comment
							</th>
						</tr>
					</thead>
					<tbody>
						{history.map((record) => (
							<tr
								key={record.id}
								className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							>
								<td className='px-6 py-4'>
									{new Date(record.timestamp.toMillis()).toLocaleString()}
								</td>
								<td className='px-6 py-4 text-green-600 font-medium'>
									{record.added_quantity || 0}
								</td>
								<td className='px-6 py-4 text-red-600 font-medium'>
									{record.removed_quantity || 0}
								</td>
								<td className='px-6 py-4'>{record.comment || 'N/A'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='mt-6'>
				<h2 className='text-lg font-semibold text-gray-800'>
					Current Quantity:{' '}
					<span className='text-indigo-600 font-bold'>{currentQuantity}</span>
				</h2>
			</div>
		</div>
	);
};

export default History;
