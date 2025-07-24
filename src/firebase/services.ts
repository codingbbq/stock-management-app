import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./config";

// Function to get the user by user_name
export const getUserByUserName = async (userName: string) => {
  
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("username", "==", userName));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id; // Assuming username is unique and returning the first match
  } else {
    throw new Error("User not found");
  }
};

// Function to get the user's company
export const getUserCompany = async (userId: string) => {
  const companyCollection = collection(db, "users", userId, "company");
  const companySnapshot = await getDocs(companyCollection);
  if(companySnapshot.empty) {
    throw new Error("Company not found");
  }
  return companySnapshot.docs[0].id;
};

// Function to get products for a company
export const getCompanyProducts = async (userId: string, companyId: string) => {
  const productsCollection = collection(db, "users", userId, "company", companyId, "products");
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => doc.data());
  return productsList;
};

// Function to get products for the logged-in user
export const getProductsForUser = async (userId: string) => {
  try {
    const companyId = await getUserCompany(userId);
    const products = await getCompanyProducts(userId, companyId);
    return products;
  } catch (error) {
    console.error("Error fetching products for user:", error);
    throw error;
  }
};

// Function to get products for the user by user_name
export const getProductsForUserByUserName = async (userName: string) => {
    try {
      const userId = await getUserByUserName(userName);
      const companyId = await getUserCompany(userId);
      const products = await getCompanyProducts(userId,companyId);
      return products;
    } catch (error) {
      console.error("Error fetching products for user:", error);
      throw error;
    }
  };