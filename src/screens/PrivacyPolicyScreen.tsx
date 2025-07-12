import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useLayoutEffect} from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import {RootStackParamList} from "../navigation/types";
import {Typography} from "../theme/typography";
import {Gray, MainBg, PrimaryBlue} from "../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {t} from "i18next";

export default function PrivacyPolicyScreen() {
  const rootNavigation =
    useNavigation<StackNavigationProp<RootStackParamList>>();
  //const tabNavigation = useNavigation<BottomTabNavigationProp<TabsParamList>>();

  const openPrivacyUrl = () => {
    const url = "https://sites.google.com/view/measureandcount/home";
    Linking.openURL(url).catch(e => {
      console.error("Could not open URL", e);
    });
  };

  useLayoutEffect(() => {
    rootNavigation.setOptions({
      header: () => <TopBar title={t("privacy_policy_title")} />,
    });
  }, [rootNavigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.body}>{t("privacy_policy_description")}</Text>
        <Spacer />

        <Text style={styles.body}>{t("privacy_policy_subtitle_1")}</Text>
        <Spacer />
        <Text>{t("privacy_policy_text_1")}</Text>
        <Spacer />

        <Text style={styles.body}>{t("privacy_policy_subtitle_2")}</Text>
        <Spacer />
        <Text>{t("privacy_policy_text_2")}</Text>
        <Spacer />

        <Text style={styles.body}>{t("privacy_policy_subtitle_3")}</Text>
        <Spacer />
        <Text>{t("privacy_policy_text_3")}</Text>
        <Spacer />

        <Text style={styles.body}>{t("privacy_policy_subtitle_4")}</Text>
        <Spacer />
        <Text>{t("privacy_policy_text_4")}</Text>
        <Spacer />

        <Text style={styles.body}>{t("privacy_policy_subtitle_5")}</Text>
        <Spacer />
        <Text>{t("privacy_policy_text_5")}</Text>
        <Spacer />

        <Text>{t("privacy_policy_where_to_email")}</Text>
        <Spacer size={32} />

        <Pressable onPress={openPrivacyUrl}>
          <Text style={styles.link}>{t("privacy_policy")}</Text>
        </Pressable>

        <Spacer size={32} />
      </ScrollView>
    </View>
  );
}

const Spacer = ({size = 16}: {size?: number}) => (
  <View style={{height: size}} />
);

interface Props {
  title: string;
}

export function TopBar({title}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MainBg,
    flex: 1,
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
    marginBottom: 10,
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  body: {
    ...Typography.bodyNormal,
    marginBottom: 0,
  },
  link: {
    fontSize: 16,
    color: PrimaryBlue,
    textDecorationLine: "underline",
  },
});
