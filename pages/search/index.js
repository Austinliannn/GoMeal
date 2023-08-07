import React, { useState, useEffect } from "react";
import Card from "../../components/card";
import FooterNav from "../../components/footerNav";
import SearchBar from "../../components/searchBar";
import { getRecipe } from "../../api/recipes";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { NativeBaseProvider, Stack, Box } from "native-base";

const Search = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      const allRecipe = await getRecipe();
      setRecipes(allRecipe);
    };
    getRecipes();
  }, []);

  const filterRecipes = () => {
    if (!searchQuery.trim()) {
      return recipes;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerCaseQuery) ||
        recipe.ingredients.toLowerCase().includes(lowerCaseQuery)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "80%" }}>
        <Image
          style={styles.headerImg}
          source={require("../../assets/searchHeader.jpg")}
        />
        <View style={styles.headerText}>
          <SearchBar />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.header}>Last Searched</Text>
          <NativeBaseProvider>
            <Stack direction="row" flexWrap="wrap" justifyContent="center">
              {recipes.map((recipe, index) =>
                index < 3 ? (
                  <Box
                    key={index}
                    flex={1}
                    alignItems="center"
                  >
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
                ) : null
              )}
            </Stack>
          </NativeBaseProvider>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.header}>Search Results</Text>
          <NativeBaseProvider>
            <Stack direction="row" flexWrap="wrap" justifyContent="center">
              {filterRecipes().map((recipe, index) =>
                index < 3 ? (
                  <Box
                    key={index}
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                  >
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
                ) : null
              )}
            </Stack>
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
});

export default Search;
