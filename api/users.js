import { firebase } from "../firebase";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import "firebase/firestore";

export const addUser = async (userId, userData) => {
    try {
      const usersCollection = collection(firebase, "users");
      await setDoc(doc(usersCollection, userId), userData);
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

export const editGroceryList = async (groceryList) => {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    const userId = user.uid;
    const userCollection = doc(collection(firebase, "users"), userId);
    await setDoc(userCollection, { groceryList }, { merge: true });
  } catch (error) {
    console.error("Error adding/updating grocery list data:", error);
  }
};

// export const editRecipeList = async (recipeList) => {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   try {
//     const userId = user.uid;
//     const userCollection = doc(collection(firebase, "users"), userId);
//     await setDoc(userCollection, { recipeList }, { merge: true });
//   } catch (error) {
//     console.error("Error adding/updating recipeList data:", error);
//   }
// };

