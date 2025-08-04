import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { formatDate } from '@/helper/formatdata';

const History = ({ product }: DocumentData) => {
	const [history, setHistory] = useState<any[]>([]);
	const [currentQuantity, setCurrentQuantity] = useState<number>(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				// Fetch product details to get the current quantity
				const productRef = doc(db, 'products', product.id);
				const productSnapshot = await getDoc(productRef);
				if (productSnapshot.exists()) {
					const productData = productSnapshot.data();
					setCurrentQuantity(productData.quantity || 0);
				}

				// Fetch history subcollection
				const historyRef = collection(db, 'products', product.id, 'history');
				const historySnapshot = await getDocs(historyRef);
				const historyData = historySnapshot.docs.map((doc) => {
					const data = doc.data();
					console.log(data);
					return {
						id: doc.id,
						...data,
						qtyAdded: data.action === 'added' ? data.quantity || 0 : 0, // Set qtyAdded if action is "added"
						qtyRemoved: data.action === 'removed' ? data.quantity || 0 : 0, // Set qtyRemoved if action is "removed"
					};
				});

				// Sort history by timestamp (most recent first)
				// historyData.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());

				setHistory(historyData);
			} catch (error) {
				console.error('Error fetching history:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchHistory();
	}, [product.id]);

	if (loading) {
		return <p className='text-center text-gray-500'>Loading history...</p>;
	}

	return (
		<div className='container mx-auto p-6 max-w-4xl'>
			<div className='relative overflow-hidden shadow-md sm:rounded-lg'>
				<div className='h-[350px] overflow-y-auto'>
					<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th
									scope='col'
									className='px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700'
								>
									Date
								</th>
								<th
									scope='col'
									className='px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700'
								>
									Added Quantity
								</th>
								<th
									scope='col'
									className='px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700'
								>
									Removed Quantity
								</th>
								<th
									scope='col'
									className='px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700'
								>
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
										{formatDate(record.timestamp)}
									</td>
									<td className='px-6 py-4 text-green-600 font-medium'>
										{record.qtyAdded > 0 ? `+${record.qtyAdded}` : 0}
									</td>
									<td className='px-6 py-4 text-red-600 font-medium'>
										{record.qtyRemoved > 0 ? `-${record.qtyRemoved}` : 0}
									</td>
									<td className='px-6 py-4'>{record.comment || 'N/A'}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
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
