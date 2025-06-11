import React, {useEffect} from "react";
import {View, Text, Button, Alert} from "react-native";
import {useAddNewItemStore} from "./AddNewItemStore";

export default function AddNewItemScreen() {
  const {state, processIntent, currentEffect, consumeEffect} =
    useAddNewItemStore();

  // Handle one-time effects
  useEffect(() => {
    if (!currentEffect) return;

    switch (currentEffect.type) {
      case "ShowSnackbar":
        Alert.alert("Snackbar", currentEffect.message);
        break;
      case "NavigateBack":
        Alert.alert("Navigation", "Should navigate back");
        break;
      default:
        Alert.alert("Unhandled effect", currentEffect.type);
        break;
    }

    consumeEffect();
  }, [currentEffect, consumeEffect]);

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Add New Item Screen</Text>

      <Text style={{marginTop: 10}}>
        Add area is {state.isAddAreaOpen ? "open" : "closed"}
      </Text>

      <Button
        title="Toggle Add Area"
        onPress={() => processIntent({type: "ToggleAddAreaVisibility"})}
      />

      <Button
        title="Back"
        onPress={() => processIntent({type: "Back"})}
        color="darkred"
      />
    </View>
  );
}
