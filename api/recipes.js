import { firebase } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const getRecipe = async () => {
  try {
    const recipesRef = collection(firebase, "recipes");
    const recipesSnapshot = await getDocs(recipesRef);
    const recipes = recipesSnapshot.docs.map((doc) => doc.data());
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};