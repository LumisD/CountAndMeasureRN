import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/types"; // adjust path if needed
import {useNavigation} from "@react-navigation/native";
import {Button} from "react-native";
import {useRealm} from "../data/db/RealmContext";
import {provideMeasureAndCountRepository} from "../data/db/dao/provideRepository";
import {useMemo} from "react";

type NavigationProp = StackNavigationProp<RootStackParamList, "Count">;

const ListsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const realm = useRealm();
  const repo = useMemo(() => provideMeasureAndCountRepository(realm), [realm]);
  //const stateHolder = useMemo(() => new StateHolder(repo), [repo]);

  const goToCount = (id: string) => {
    navigation.navigate("Count", {unionId: id});
  };

  return (
    // your UI
    <Button title="Go to Count" onPress={() => goToCount("42")} />
  );
};

export default ListsScreen;
