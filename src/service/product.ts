import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/third-party/firebase/config';

// Function to get all products
export const getAllProducts = async () => {
	try {
		const productsCollection = collection(db, 'products'); // Assuming "Products" is a top-level collection
		const productsSnapshot = await getDocs(productsCollection);
		const productsList = productsSnapshot.docs.map((doc) => ({
			id: doc.id, // Include the document ID
			...doc.data(), // Spread the document data
		}));
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

export const addProduct = async (productData: {
	img: string; // URL or base64 string of the product image
	product_code: string;
	name: string;
	quantity: number;
	updatedAt: number; // Timestamp in milliseconds
  }) => {
	try {
	  // Reference to the `products` collection
	  const productsRef = collection(db, "products");
  
	  // Add the product to the collection
	  const docRef = await addDoc(productsRef, productData);
  
	  console.log(`Product added successfully with ID: ${docRef.id}`);
	  return docRef.id; // Return the document ID of the newly added product
	} catch (error) {
	  console.error("Error adding product:", error);
	  throw error; // Rethrow the error for further handling
	}
  };

export const addProductHistory = async (
	productId: string,
	historyData: {
		action: string;
		quantity: number;
		comment: string;
		timestamp: number;
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
