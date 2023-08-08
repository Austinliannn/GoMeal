import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import FooterNav from "../../components/footerNav";
import SearchBar from "../../components/searchBar";
import Button from "../../components/button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser } from "../../api/users";

const Account = ({ navigation }) => {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);

  const savedData = [
    {
      title: "Flakes on Dress Gardens",
      author: "Recipe Author",
      imageUrl:
        "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
    },
    {
      title: "Flakes on Dress Gardens",
      author: "Recipe Author",
      imageUrl:
        "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
    },
    {
      title: "Garden Grilled Salmon",
      author: "Recipe Author",
      imageUrl:
        "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const userDatas = await getUser(user.uid);
      setUserData(userDatas);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "80%" }}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{userData?.name}</Text>
          <Text style={styles.subtitle}>{userData?.bio}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.searchBar}>
            <SearchBar />
          </View>
          <View style={styles.list}>
            {savedData.map((item, index) => (
              <Button
                key={index}
                btnStyle={styles.btnStyle}
                textStyle={styles.textStyle}
                hide={false}
                title={item.title}
                author={item.author}
                imageUrl={item.imageUrl}
              />
            ))}
          </View>
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
    top: 90,
    paddingTop: "12%",
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
    marginTop: "32%",
    width: "85%",
    alignSelf: "center",
  },
  searchBar: {
    paddingBottom: 40,
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
});

export default Account;
