import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Function to get all products
export const getAllProducts = async () => {
	try {
		const productsCollection = collection(db, 'products'); // Assuming "Products" is a top-level collection
		const productsSnapshot = await getDocs(productsCollection);
		const productsList = productsSnapshot.docs.map((doc) => ({
			id: doc.id, // Include the document ID
			...doc.data(), // Spread the document data
		}));
		console.log('Fetched products:', productsList);
		return productsList;
	} catch (error) {
		console.error('Error fetching all products:', error);
		throw error;
	}
};

export const updateProduct = async (productId: string, updatedData: any) => {
	try {
		const productRef = doc(db, 'products', productId);
		await updateDoc(productRef, {
			product_code: updatedData.code,
			name: updatedData.name,
			quantity: updatedData.quantity,
			updatedAt: new Date().getTime(), // Update the timestamp to current time
		});
		console.log(`Product ${productId} updated successfully.`);
	} catch (error) {
		console.error('Error updating product:', error);
		throw error;
	}
};

export const addProductHistory = async (
	productId: string,
	historyData: {
		action: string;
		quantity: number;
		comment: string;
		timestamp: Date;
	}
) => {
	try {
		// Reference to the history subcollection of the product
		const historyRef = collection(db, 'products', productId, 'history');

		// Add a new document to the history subcollection
		await addDoc(historyRef, historyData);

		console.log('Product history added successfully!');
	} catch (error) {
		console.error('Error adding product history:', error);
		throw error;
	}
};
