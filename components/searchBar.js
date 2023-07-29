import React from "react";
import {
  VStack,
  Input,
  Icon,
  NativeBaseProvider,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const SearchBar = ({}) => {
  return (
    <NativeBaseProvider>
        <VStack w="100%" alignSelf="center">
        <Input
            placeholder="Search recipe..."
            variant="filled"
            width="100%"
            py="3"
            px="2"
            borderRadius="10"
            borderColor="grey"
            InputLeftElement={
            <Icon
                ml="2"
                size="5"
                color="black"
                as={<Ionicons name="ios-search" />}
            />
            }
        />
        </VStack>
    </NativeBaseProvider>
  );
};

export default SearchBar;
