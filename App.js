import { React } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./pages/home";
import Search from "./pages/search";
import GroceryList from "./pages/groceryList";
import Account from "./pages/account";
import Details from "./components/detail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="GroceryList" component={GroceryList}/>
        <Stack.Screen name="Account" component={Account}/>
        <Stack.Screen name="Details" component={Details}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}