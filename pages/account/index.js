import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FooterNav from "../../components/footerNav";
import SearchBar from "../../components/searchBar";
import Button from "../../components/button";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getUser } from "../../api/users";

const Account = ({ navigation }) => {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);

  const handlePress = (item) => {
    navigation.navigate("Details", {
      title: item.title,
      author: item.author,
      ingredients: item.ingredients,
      instructions: item.instructions,
      imageUrl: item.imageUrl,
      prepTime: item.prepTime,
      cookTime: item.cookTime,
      totalTime: item.totalTime,
      servings: item.servings,
      calories: item.calories,
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDatas = await getUser(user.uid);
        setUserData(userDatas);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "80%" }}>
        <View style={styles.headerText}>
          <Button
            text={"Sign Out"}
            btnStyle={styles.signOutBtn}
            textStyle={styles.textStyle}
            onPress={() => {
              handleSignOut();
            }}
          />
          <Text style={styles.title}>{userData?.name}</Text>
          <Text style={styles.subtitle}>{userData?.bio}</Text>
        </View>
        <View style={styles.contentContainer}>
          {userData?.recipeList.length > 0 ? (
            <View style={styles.list}>
              {userData.recipeList.map((item, index) => (
                <Button
                  key={index}
                  btnStyle={styles.btnStyle}
                  textStyle={styles.textStyle}
                  hide={false}
                  text={item.title}
                  onPress={() => handlePress(item)}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.noRecStyle}>
              No recipes saved at this moment!
            </Text>
          )}
        </View>
      </ScrollView>
      <FooterNav selector={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    top: 60,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 22,
    fontSize: 16,
    color: "grey",
    width: "85%",
    textAlign: "center",
  },
  contentContainer: {
    marginTop: 90,
    width: "85%",
    alignSelf: "center",
  },
  searchBar: {
    paddingBottom: 20,
  },
  list: {
    backgroundColor: "#BABABA",
    borderRadius: 10,
  },
  btnStyle: {
    width: "100%",
    height: 40,
    alignItems: "flex-start",
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  textStyle: {
    fontSize: 18,
    color: "black",
  },
  signOutBtn: {
    width: "100%",
    height: 40,
    alignItems: "flex-start",
    paddingLeft: 25,
    marginBottom: 90,
  },
  noRecStyle: {
    textAlign: "center",
  },
});

export default Account;
