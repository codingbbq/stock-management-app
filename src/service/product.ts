import { collection, getDocs } from 'firebase/firestore';
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
