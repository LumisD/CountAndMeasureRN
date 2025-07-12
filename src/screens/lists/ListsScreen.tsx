import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import {Button} from "react-native";
import {useMemo} from "react";
import {RootStackParamList} from "../../navigation/types";
import {useRealm} from "../../data/db/RealmContext";
import {provideMeasureAndCountRepository} from "../../data/db/dao/provideRepository";

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
