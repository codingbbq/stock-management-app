import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import bcrypt from "bcryptjs";

export const authenticateUser = async (username: string, password: string) => {
  try {

    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Compare the provided password with the hashed password in Firestore
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Return the authenticated user
    return { id: userDoc.id, ...userData };
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};