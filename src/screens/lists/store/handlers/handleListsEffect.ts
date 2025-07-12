import {ListsEffect, NAVIGATE_TO_COUNT_SCREEN} from "../../ListsEffect";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../../navigation/types";

export function handleListsEffects(
  currentEffect: ListsEffect,
  navigation: StackNavigationProp<RootStackParamList>,
) {
  switch (currentEffect.type) {
    case NAVIGATE_TO_COUNT_SCREEN: {
      const {unionId} = currentEffect;
      navigation.navigate("Count", {unionId: unionId});
      break;
    }

    default:
      console.warn("MaC handleCountffects Unhandled effect:", currentEffect);
      break;
  }
}
