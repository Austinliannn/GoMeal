import React, { useState, useEffect } from "react";
import Card from "../../components/card";
import FooterNav from "../../components/footerNav";
import SearchBar from "../../components/searchBar";
import { getRecipe } from "../../api/recipes";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { NativeBaseProvider, Box } from "native-base";

const Search = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const allRecipe = await getRecipe();
      setRecipes(allRecipe);
    };
    getRecipes();
  }, []);

  useEffect(() => {
    const filtered = filterRecipes();
    setFilteredRecipes(filtered);
  }, [searchQuery, recipes]);

  const filterRecipes = () => {
    if (!searchQuery.trim()) {
      return recipes;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return recipes.filter((recipe) => {
      const titleMatch = recipe.title.toLowerCase().includes(lowerCaseQuery);
      const ingredientMatch = recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(lowerCaseQuery)
      );
      return titleMatch || ingredientMatch;
    });
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const renderRecipeCard = (recipe, index) => (
    <Box key={index} flex={1} alignItems="center" style={styles.cardBox}>
      <Card
        title={recipe.title}
        author={recipe.author}
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
        imageUrl={recipe.imageUrl}
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        totalTime={recipe.totalTime}
        servings={recipe.servings}
        calories={recipe.calories}
      />
    </Box>
  );

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "80%" }}>
        <Image
          style={styles.headerImg}
          source={require("../../assets/searchHeader.jpg")}
        />
        <View style={styles.headerText}>
          <SearchBar onSearchQueryChange={handleSearchQueryChange} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.header}>Search Results</Text>
          <NativeBaseProvider>
            {searchQuery !== "" ? (
              filteredRecipes.length > 0 ? (
                <View style={styles.recipeRowsContainer}>
                  {chunkArray(filteredRecipes, 3).map(
                    (rowRecipes, rowIndex) => (
                      <View style={styles.rowContainer} key={rowIndex}>
                        {rowRecipes.map((recipe, index) =>
                          renderRecipeCard(recipe, index)
                        )}
                      </View>
                    )
                  )}
                </View>
              ) : (
                <Text>No recipes found.</Text>
              )
            ) : (
              <View style={styles.rowContainer}>
                <Text>Search for recipes to view results.</Text>
              </View>
            )}
          </NativeBaseProvider>
        </View>
      </ScrollView>
      <FooterNav selector={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  headerImg: {
    width: "100%",
    height: 230,
  },
  headerText: {
    position: "absolute",
    top: 150,
    width: "85%",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "white",
  },
  contentContainer: {
    paddingTop: 40,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 30,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardBox: {
    width: "30%",
    margin: "1.5%",
  },
});

export default Search;
