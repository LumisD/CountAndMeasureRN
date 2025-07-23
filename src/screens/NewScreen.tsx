import React, {useLayoutEffect} from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'

import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/types";
import {NewScreenType} from "./models/NewScreenType";
import {useTranslation} from "react-i18next";
import {defaultScreenTypes} from "./common/screenData";
import {UpArrowIcon, XIcon} from "./common/components/UiElements";
import {Typography} from "../theme/typography";
import {Gray, MainBg, Transparent} from "../theme/colors";

type NewScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "AddNewItem">;
};

const NewScreen = ({navigation}: NewScreenProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <TopBar />,
    });
  }, [navigation]);
  return (
    <View style={styles.safeArea}>
      {/* important to set background color for the screen */}
      <View style={styles.container}>
        <ListOfNewScreenTypes />
      </View>
    </View>
  );
};

function TopBar() {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.topBar} edges={['top']}>
      {/* important to set background color for the topBar */}
      <Text style={Typography.titleLarge}>
        {t("choose_type_of_measurement")}
      </Text>
    </SafeAreaView>
  );
}

function ListOfNewScreenTypes() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "AddNewItem">>();

  return (
    <FlatList
      data={defaultScreenTypes}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => (
        <View>
          <ListItem
            item={item}
            onPress={() => {
              const serializedItemType = JSON.stringify(item);
              navigation.navigate("AddNewItem", {serializedItemType});
            }}
          />
          {index < defaultScreenTypes.length - 1 && (
            <View style={styles.divider} />
          )}
        </View>
      )}
    />
  );
}

type ListItemProps = {
  item: NewScreenType;
  onPress: () => void;
};

function ListItem({item, onPress}: ListItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.itemRow}>
      <MiddleContent type={item} />
    </Pressable>
  );
}

type MiddleContentProps = {
  type: NewScreenType;
};

function MiddleContent({type}: MiddleContentProps) {
  const {t} = useTranslation();
  const {columnNames, directionColumn, hasColor} = type;

  return (
    <View style={styles.middleRow}>
      {columnNames.map((name, index) => (
        <React.Fragment key={index}>
          {directionColumn === index + 1 && <UpArrowIcon />}
          <Text style={Typography.bodyNormal}>{t(name)}</Text>
          {(index < columnNames.length - 1 || hasColor) && <XIcon />}
          {index === columnNames.length - 1 && hasColor && (
            <Text style={Typography.bodyNormal}>{t("color_column")}</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MainBg,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Transparent,
  },
  topBar: {
    paddingVertical: 16,
    backgroundColor: MainBg,
  },
  divider: {
    height: 2,
    backgroundColor: Gray,
  },
  itemRow: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default NewScreen;
