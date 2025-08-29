import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

/**
 * Checks if a given username exists in the 'users' collection.
 * @param username The username to check.
 * @returns Promise<boolean> - true if exists, false otherwise.
 */
export const checkUsernameExists = async (username: string): Promise<boolean> => {
  if (!username) return false;

  const db = getFirestore(); 
  const usersRef = collection(db, "campaignUsers");
  const q = query(usersRef, where("username", "==", username));

  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
