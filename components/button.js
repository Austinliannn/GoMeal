import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Button = ({ btnStyle, textStyle, title, author, imageUrl }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("MoreDetails", { title, author, imageUrl });
  };

  return (
    <TouchableOpacity style={[styles.btn, btnStyle]} onPress={handlePress}>
      <Text style={[styles.btnText, textStyle]}>{title}</Text>
      <AntDesign name="rightcircleo" size={20} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 165,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingTop: "3%",
  },
  btnText: {
    fontSize: 16,
    color: "blue",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
