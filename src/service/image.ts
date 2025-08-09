import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Uploads an image to Firebase Storage and returns its URL.
 * @param file - The image file to upload.
 * @param folder - The folder in Firebase Storage where the image will be stored.
 * @returns The URL of the uploaded image.
 */
export const uploadImageToFirebase = async (file: File, folder: string): Promise<string> => {
	try {
		const storage = getStorage();
		const storageRef = ref(storage, `${folder}/${file.name}.${Date.now()}`); // Unique filename with timestamp
		await uploadBytes(storageRef, file);
		const downloadURL = await getDownloadURL(storageRef);
		console.log('Image uploaded successfully:', downloadURL);
		return downloadURL;
	} catch (error) {
		console.error('Error uploading image to Firebase Storage:', error);
		throw error;
	}
};

export const deleteImageFromFirebase = async (imgURL: string) => {
    try {
        const storage = getStorage();
        // Extract the path after '/o/' and before '?' from the URL
        const matches = decodeURIComponent(imgURL).match(/\/o\/(.+)\?/);
        const filePath = matches?.[1];
        if (!filePath) throw new Error("Invalid image URL format.");
        const imageRef = ref(storage, filePath);
        await deleteObject(imageRef);
        console.log("Image deleted from Firebase Storage:", filePath);
    } catch (error) {
        console.error("Error deleting image from Firebase Storage:", error);
    }
};
