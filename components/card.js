import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import {
  NativeBaseProvider,
  Box,
  AspectRatio,
  Stack,
  Heading,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

const Card = ({
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
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Details", {
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
    });
  };

  return (
    <NativeBaseProvider>
      <TouchableOpacity onPress={handlePress}>
        <Box
          maxW="115"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" h="90" ratio={16 / 9}>
              <Image source={{ uri: imageUrl }} alt="image" />
            </AspectRatio>
          </Box>

          <Stack pl="2" pb="2" space={3}>
            <Stack space={2}>
              <Heading size="xs" pt="2">
                {title}
              </Heading>
              <Text style={{ fontSize: 10 }}>By: {author}</Text>
            </Stack>
          </Stack>
        </Box>
      </TouchableOpacity>
    </NativeBaseProvider>
  );
};

export default Card;
