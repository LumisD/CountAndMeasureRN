import React, {createContext, useContext} from "react";
import {useColorScheme} from "react-native";
import {LightTheme, DarkTheme} from "./theme";

const ThemeContext = createContext(LightTheme);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
