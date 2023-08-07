import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { signInWithEmailPassword } from "../../../auth";
import { useNavigation } from "@react-navigation/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      const user = await signInWithEmailPassword(email, password);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Invalid email or password. Please try again."
      );
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To GoMeal!</Text>
      <Text style={styles.subtitle}>
        Your ultimate meal planning companion. Discover, cook, and enjoy
        delicious recipes. Simplify your cooking journey with GoMeal!
      </Text>
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
      <Button title="Login" onPress={handleSignIn} />
      <Button title="Sign Up New Account" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    width: "80%",
  },
  subtitle: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    marginBottom: 20,
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
});

export default Login;
