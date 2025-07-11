import {NavigatorScreenParams} from "@react-navigation/native";

export const SCREENS = {
  Tabs: "Tabs",
  Lists: "Lists",
  New: "New",
  Privacy: "Privacy",
} as const;

export type TabsParamList = {
  Lists: undefined;
  New: undefined;
  Privacy: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  Count: {unionId: string};
  AddNewItem: {serializedItemType: string};
};
