import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import FooterNav from "../../components/footerNav";
import {
  Input,
  IconButton,
  Checkbox,
  Box,
  VStack,
  HStack,
  Icon,
  Center,
  useToast,
  NativeBaseProvider,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";

const GroceryList = ({ navigation }) => {
  const listData = [
    {
      task: "Code",
      qty: "2",
      isCompleted: false,
    },
    {
      task: "Meeting with team at 9",
      qty: "2",
      isCompleted: false,
    },
    {
      task: "Check Emails",
      qty: "2",
      isCompleted: false,
    },
    {
      task: "Write an article",
      qty: "2",
      isCompleted: false,
    },
  ];
  const [list, setList] = React.useState(listData);
  const [taskValue, setTaskValue] = React.useState("");
  const [qtyValue, setQtyValue] = React.useState("");
  const toast = useToast();

  const addItem = (task, qty) => {
    if (task === "" || qty === "") {
      toast.show({
        task: "Please Enter Text",
        qty: "Please Enter Quantity",
        status: "warning",
      });
      return;
    }
    setList((prevList) => {
      return [
        {
          task: task,
          qty: qty,
          isCompleted: false,
        },
        ...prevList,
      ];
    });
  };

  const handleDelete = (index) => {
    setList((prevList) => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };

  const handleStatusChange = (index) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "80%" }}>
        <Image
          style={styles.headerImg}
          source={require("../../assets/groceryListHeader.jpg")}
        />
        <View style={styles.headerText}>
          <Text style={styles.task}>Shopping List</Text>
        </View>

        <View style={styles.contentContainer}>
          <NativeBaseProvider>
            <Center w="100%">
              <Box w="85%">
                <VStack space={4}>
                  <HStack space={2}>
                    <Input
                      style={styles.input}
                      flex={2}
                      onChangeText={(v) => setTaskValue(v)}
                      value={taskValue}
                      placeholder="Add Task"
                    />
                    <Input
                      style={styles.input}
                      flex={1}
                      onChangeText={(v) => setQtyValue(v)}
                      value={qtyValue}
                      placeholder="Quantity"
                    />
                    <IconButton
                      borderRadius="sm"
                      variant="solid"
                      icon={
                        <Icon
                          as={Feather}
                          name="plus"
                          size="sm"
                          color="warmGray.50"
                        />
                      }
                      onPress={() => {
                        addItem(taskValue, qtyValue);
                        setTaskValue("");
                        setQtyValue("");
                      }}
                    />
                  </HStack>
                  <VStack space={2}>
                    {list && list.length > 0 ? (
                      list.map((item, itemI) => (
                        <HStack
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          key={item.task + itemI.toString()}
                        >
                          <Checkbox
                            isChecked={item.isCompleted}
                            onChange={() => handleStatusChange(itemI)}
                            value={item.task}
                            aria-label={item.task}
                          ></Checkbox>
                          <Text
                            width="60%"
                            flexShrink={1}
                            textAlign="left"
                            onPress={() => handleStatusChange(itemI)}
                            style={{
                              textDecorationLine: item.isCompleted
                                ? "line-through"
                                : "none",
                              color: item.isCompleted ? "gray" : "black",
                            }}
                          >
                            {item.task}
                          </Text>
                          <Text
                            width="20%"
                            flexShrink={1}
                            textAlign="right"
                            onPress={() => handleStatusChange(itemI)}
                            style={{
                              textDecorationLine: item.isCompleted
                                ? "line-through"
                                : "none",
                              color: item.isCompleted ? "gray" : "black",
                            }}
                          >
                            {item.qty}
                          </Text>
                          <IconButton
                            size="sm"
                            colorScheme="trueGray"
                            icon={
                              <Icon
                                as={Entypo}
                                name="minus"
                                size="xs"
                                color="trueGray.400"
                              />
                            }
                            onPress={() => handleDelete(itemI)}
                            label="Delete Item"
                          />
                        </HStack>
                      ))
                    ) : (
                      <Text>No items added to list yet.</Text>
                    )}
                  </VStack>
                </VStack>
              </Box>
            </Center>
          </NativeBaseProvider>
        </View>
      </ScrollView>
      <FooterNav selector={2} />
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
    left: 30,
    right: 30,
  },
  task: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    paddingTop: 40,
  },
  input: {
    backgroundColor: "white",
  },
});

export default GroceryList;
