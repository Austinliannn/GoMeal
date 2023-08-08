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

export const addRecipes = async () => {
  try {
    const recipesRef = collection(firebase, "recipes");

    // Sample recipes data
    const recipesData = [
      {
        title: "Margherita Pizza",
        author: "Michael Lee",
        ingredients: [
          "1 pizza dough",
          "1/2 cup pizza sauce",
          "1 cup shredded mozzarella cheese",
          "1 large tomato, sliced",
          "Fresh basil leaves",
          "Olive oil",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Preheat the oven to 450°F (230°C).",
          "Roll out the pizza dough on a floured surface to your desired thickness.",
          "Transfer the dough to a baking sheet or pizza stone.",
          "Spread pizza sauce evenly over the dough.",
          "Sprinkle shredded mozzarella cheese on top of the sauce.",
          "Arrange sliced tomatoes and fresh basil leaves on the pizza.",
          "Drizzle with olive oil and season with salt and pepper.",
          "Bake in the preheated oven for 12-15 minutes or until the crust is golden and the cheese is bubbly and slightly browned.",
          "Slice and serve hot."
        ],
        imageUrl: "https://example.com/images/margherita-pizza.jpg",
        prepTime: "20 minutes",
        cookTime: "15 minutes",
        totalTime: "35 minutes",
        servings: "4",
        calories: "300",
      }
    ];

    // Add each recipe to the "recipes" collection
    for (const recipe of recipesData) {
      await addDoc(recipesRef, recipe);
    }

    console.log("Recipes added successfully");
  } catch (error) {
    console.error("Error adding recipes:", error);
  }
};