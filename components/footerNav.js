import React, {useState} from "react";
import { Text } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Icon,
  HStack,
  Center,
  Pressable,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const FooterNav = ({selector}) => {
  const [selected, setSelected] = useState(selector);

  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToProfile = () => {
    navigation.navigate('Search');
  };

  const navigateToGroceryList = () => {
    navigation.navigate('GroceryList');
  };

  const navigateToAccount = () => {
    navigation.navigate('Account');
  };

  return (
    <NativeBaseProvider>
      <Box
        flex={1}
        bg="white"
        safeAreaTop
        width="100%"
        alignSelf="center"
      >
        <HStack alignItems="center" shadow={6}>
          <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => navigateToHome()}
          >
            <Center>
              <Icon
                as={<MaterialCommunityIcons name={selected === 0 ? "home" : "home-outline"}/>}
                color="black"
                size="lg"
              />
              <Text fontSize="12">Home</Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => navigateToProfile()}
          >
            <Center>
              <Icon
                as={<MaterialIcons name="search" />}
                color="black"
                size="lg"
              />
              <Text fontSize="12">
                Search
              </Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 2 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => navigateToGroceryList()}
          >
            <Center>
              <Icon
                as={<MaterialCommunityIcons name={selected === 2 ? "format-list-bulleted-square" : "format-list-checkbox"}/>}
                color="black"
                size="lg"
              />
              <Text fontSize="12">Grocery List
              </Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 3 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => navigateToAccount()}
          >
            <Center>
              <Icon
                as={
                  <MaterialCommunityIcons
                    name={selected === 3 ? "account" : "account-outline"}
                  />
                }
                color="black"
                size="lg"
              />
              <Text fontSize="12">
                Account
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default FooterNav;
