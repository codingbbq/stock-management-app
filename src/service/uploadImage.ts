import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads an image to Firebase Storage and returns its URL.
 * @param file - The image file to upload.
 * @param folder - The folder in Firebase Storage where the image will be stored.
 * @returns The URL of the uploaded image.
 */
export const uploadImageToFirebase = async (file: File, folder: string): Promise<string> => {
	try {
		const storage = getStorage();
		const storageRef = ref(storage, `${folder}/${file.name}`);
		await uploadBytes(storageRef, file);
		const downloadURL = await getDownloadURL(storageRef);
		console.log('Image uploaded successfully:', downloadURL);
		return downloadURL;
	} catch (error) {
		console.error('Error uploading image to Firebase Storage:', error);
		throw error;
	}
};
