import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useLayoutEffect} from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {RootStackParamList, TabsParamList} from "../navigation/types";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {Typography} from "../theme/typography";
import {Gray, MainBg} from "../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {t} from "i18next";

export default function PrivacyPolicyScreen() {
  const rootNavigation =
    useNavigation<StackNavigationProp<RootStackParamList>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabsParamList>>();

  const openPrivacyUrl = () => {
    const url = "https://sites.google.com/view/measureandcount/home";
    Linking.openURL(url).catch(e => {
      console.error("Could not open URL", e);
    });
  };

  useLayoutEffect(() => {
    rootNavigation.setOptions({
      header: () => (
        <TopBar title={t("privacy_policy_title")} navigation={rootNavigation} />
      ),
    });
  }, [rootNavigation]);

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Privacy Policy Screen</Text>
    </View>
  );
}

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  title: string;
}

export function TopBar({navigation, title}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={32} />
        </Pressable>

        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  wrapper: {
    backgroundColor: MainBg,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  titleWrapper: {
    flex: 1,
    marginHorizontal: 16,
    alignItems: "center",
  },
  title: {
    ...Typography.titleLarge,
  },
  divider: {
    height: 2,
    backgroundColor: Gray,
    marginTop: 0,
    textAlignVertical: "top", // for multiline alignment on Android
  },
});
