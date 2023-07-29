import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import Card from "../../components/card";
import FooterNav from "../../components/footerNav";
import SearchBar from "../../components/searchBar";
import { NativeBaseProvider, Stack } from "native-base";

const Search = ({ navigation }) => {
  const resultsData = [
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
      title: "Flakes on Dress Gardens",
      author: "Recipe Author",
      imageUrl:
        "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
    },
  ];

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
            <Stack direction="row" space={2} flexWrap="wrap">
              {resultsData.map((item, index) => (
                <Card
                  key={index}
                  title={item.title}
                  author={item.author}
                  imageUrl={item.imageUrl}
                />
              ))}
            </Stack>
          </NativeBaseProvider>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.header}>Search Results</Text>
          <NativeBaseProvider>
            <Stack direction="row" space={2} flexWrap="wrap">
              {resultsData.map((item, index) => (
                <Card
                  key={index}
                  title={item.title}
                  author={item.author}
                  imageUrl={item.imageUrl}
                />
              ))}
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
    left: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});

export default Search;
