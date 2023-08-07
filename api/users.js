import { firebase } from "../firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const addUser = async (userId, userData) => {
    try {
      const usersCollection = collection(firebase, "users");
      await setDoc(doc(usersCollection, userId), userData);
      console.log('User data added to Firestore successfully');
    } catch (error) {
      console.error('Error adding user data to Firestore:', error);
    }
  };

export const getUser = async (userUID) => {
  try {
    const userRef = doc(collection(firebase, "users"), userUID);
    const userSnapshot = await getDoc(userRef);
    const user = userSnapshot.data();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
}