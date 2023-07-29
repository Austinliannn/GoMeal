import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { NativeBaseProvider, Stack, Box } from "native-base";
import Card from "../../components/card";
import FooterNav from "../../components/footerNav";
import getRecipe from "../../api/getRecipes";
import addRecipes from "../../api/addRecipes";

const Home = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const allRecipe = await getRecipe();
      setRecipes(allRecipe);
    };

    const addSampleRecipes = async () => {
      await addRecipes();
    };

    getRecipes();
    // addSampleRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "80%" }}>
        <Image
          style={styles.headerImg}
          source={require("../../assets/homeHeader.jpg")}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>GoMeal</Text>
          <Text style={styles.subtitle}>Your one stop meal planner</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.header}>Healthier Choices</Text>
          <NativeBaseProvider>
            <Stack direction="row" flexWrap="wrap" justifyContent="center">
              {recipes.map((recipe, index) =>
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

        <View style={styles.contentContainer}>
          <Text style={styles.header}>Inspirations</Text>
          <NativeBaseProvider>
            <Stack direction="row" flexWrap="wrap" justifyContent="center">
              {recipes.map((recipe, index) =>
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
      <FooterNav selector={0} />
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
    left: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
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

export default Home;
