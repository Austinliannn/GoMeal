import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser, editRecipeList } from "../api/users";

const Details = ({ route }) => {
  const auth = getAuth();
  const [heartName, setHeartName] = useState("hearto");
  const [recipeList, setRecipeList] = useState([]);
  const navigation = useNavigation();
  const {
    title,
    author,
    ingredients,
    instructions,
    imageUrl,
    prepTime,
    cookTime,
    totalTime,
    servings,
    calories,
  } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOnPress = () => {
    const newItem = {
      title: title,
      author: author,
      ingredients: ingredients,
      instructions: instructions,
      imageUrl: imageUrl,
      prepTime: prepTime,
      cookTime: cookTime,
      totalTime: totalTime,
      servings: servings,
      calories: calories,
    };

    setRecipeList((prevList) => {
      const recipeIndex = prevList.findIndex(
        (item) => item.title === newItem.title
      );

      if (recipeIndex !== -1) {
        const updatedList = prevList.filter(
          (_, index) => index !== recipeIndex
        );
        setHeartName("hearto");
        editRecipeList(updatedList);
        return updatedList;
      }

      const updatedList = [newItem, ...prevList];
      setHeartName("heart");
      editRecipeList(updatedList);
      return updatedList;
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDatas = await getUser(user.uid);
        const recipeExists = userDatas.recipeList.some(
          (recipe) => recipe.title === title
        );
        setHeartName(recipeExists ? "heart" : "hearto");
        setRecipeList(userDatas.recipeList);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={{ height: "80%" }}>
      <View style={styles.btnRow}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleOnPress();
          }}
        >
          <AntDesign name={heartName} size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image
        style={styles.imgStyle}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>By: {author}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>Ingredients List:</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.numberStyle}>{index + 1})</Text>
              <Text style={styles.contentTextStyle} key={index}>
                {ingredient}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>Instructions:</Text>
          {instructions.map((instruction, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.numberStyle}>Step {index + 1}:</Text>
              <Text style={styles.contentTextStyle} key={index}>
                {instruction}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>Notes: </Text>
          <View style={styles.stepContainer}>
            <Text style={styles.numberStyle}>Preperation Time:</Text>
            <Text style={styles.contentTextStyle}>{prepTime}</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.numberStyle}>Cooking Time:</Text>
            <Text style={styles.contentTextStyle}>{cookTime}</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.numberStyle}>Total Time:</Text>
            <Text style={styles.contentTextStyle}>{totalTime}</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.numberStyle}>Servings:</Text>
            <Text style={styles.contentTextStyle}>{servings}</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.numberStyle}>Total Calories:</Text>
            <Text style={styles.contentTextStyle}>{calories}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
  },
  imgStyle: {
    marginTop: 10,
    marginBottom: 20,
    width: "80%",
    height: 230,
    alignSelf: "center",
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  contentContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    overflow: "scroll",
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
  },
  numberStyle: {
    marginRight: 8,
  },
  contentTextStyle: {
    flex: 1,
    marginBottom: 10,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
    marginLeft: 20,
    width: "90%",
    height: 50,
    alignItems: "center",
  },
});

export default Details;
