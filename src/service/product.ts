import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
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
}

export const updateProductHistory = async (productId: string, historyData: any) => {
	try {
		const historyRef = doc(collection(db, 'products', productId, 'history')); // Create a DocumentReference within the history subcollection
		await updateDoc(historyRef, historyData);
		console.log(`Product ${productId} history updated successfully.`);
	} catch (error) {
		console.error('Error updating product history:', error);
		throw error;
	}
}
