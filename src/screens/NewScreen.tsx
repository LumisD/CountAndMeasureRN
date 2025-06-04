import React from "react";
import {View, Button} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/types";
import {NewScreenType} from "./models/NewScreenType";

type NavigationProp = StackNavigationProp<RootStackParamList, "AddNewItem">;

const NewScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToAddNewItem = () => {
    const item: NewScreenType = {
      hasColor: true,
      directionColumn: 2,
      columnNames: ["1", "2", "3"],
    };

    const serializedItemType = JSON.stringify(item);
    navigation.navigate("AddNewItem", {serializedItemType});
  };

  return (
    <View>
      <Button title="Go to AddNewItem" onPress={goToAddNewItem} />
    </View>
  );
};

export default NewScreen;
