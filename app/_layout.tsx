import React, { useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { name as appName } from "../app.json";
import App from "./App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Main = () => {
  const [mode, setMode] = useState("light");
  useEffect(() => {
    AsyncStorage.getItem("mode").then((data) => { if (data != null) setMode(data); });
  }, [mode]);

  return (
    <PaperProvider theme={mode == "light" ? MD3LightTheme : MD3DarkTheme}>
      <App />
    </PaperProvider>
  );
}

export default Main;

AppRegistry.registerComponent(appName, () => Main);

// https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator
// https://pictogrammers.com/library/mdi/
