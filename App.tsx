import React from "react";
import "./src/locales/i18n";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useTranslation} from "react-i18next";
import {ThemeProvider} from "./src/theme/ThemeContext";

import ListsScreen from "./src/screens/ListsScreen";
import NewScreen from "./src/screens/NewScreen";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicyScreen";
import CountScreen from "./src/screens/CountScreen";
import AddNewItemScreen from "./src/screens/addnewitem/AddNewItemScreen";
import {RootStackParamList} from "./src/navigation/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {StatusBar} from "react-native";
import {MainBg} from "./src/theme/colors";
import {RealmProvider} from "./src/data/db/RealmContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = "";

          if (route.name === "Lists") {
            iconName = "folder-check-outline";
          } else if (route.name === "New") {
            iconName = "plus-box-outline";
          } else if (route.name === "Privacy") {
            iconName = "shield-lock-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {backgroundColor: MainBg}, //important to set background color for the tab bar
      })}>
      <Tab.Screen
        name="Lists"
        component={ListsScreen}
        options={{title: t("lists")}}
      />
      <Tab.Screen
        name="New"
        component={NewScreen}
        options={{title: t("_new")}}
      />
      <Tab.Screen
        name="Privacy"
        component={PrivacyPolicyScreen}
        options={{title: t("privacy")}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={MainBg} barStyle="dark-content" />
      <ThemeProvider>
        <RealmProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Tabs"
                component={TabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen name="Count" component={CountScreen} />
              <Stack.Screen name="AddNewItem" component={AddNewItemScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </RealmProvider>
      </ThemeProvider>
    </>
  );
}
