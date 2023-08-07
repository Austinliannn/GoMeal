import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { signUpWithEmailPassword } from "../../../auth";
import { addUser } from "../../../api/users";
import { AntDesign } from "@expo/vector-icons";

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async () => {
    try {
      if (userName != "" && bio != "") {
        const user = await signUpWithEmailPassword(email, password);
        await addUser(user.uid, {
          name: userName,
          email: user.email,
          lastThreeRecipe: [],
          groceryList: [],
          recipeList: [],
          bio: bio,
        });
        Alert.alert("Account Created Successfully");
        handleGoBack();
      } else {
        Alert.alert(
          "Sign Up Failed",
          "Please ensure that all fields are filled. Password must be above 6 characters. Please ensure email format is correct."
        );
      }
    } catch (error) {
      Alert.alert(
        "Sign Up Failed",
        "Please ensure that all fields are filled. Password must be above 6 characters. Please ensure email format is correct."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backBtn}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up an Account with us today!</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "40%",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    width: "80%",
  },
  input: {
    width: 300,
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  backBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
