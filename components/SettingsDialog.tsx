import React, { useState, useEffect } from "react";
import { Text, Button, Portal, Dialog } from "react-native-paper";
import Styles from "@/styles/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LineBreak from "@/components/LineBreak";

interface ISettingsDialogProps {
  isVisible: boolean,
  close: Function
}

const SettingsDialog = ({ isVisible, close }: ISettingsDialogProps) => {
  const [mode, setMode] = useState("light");
  const [locale, setLocale] = useState("en-us");
  const locales = [
    "en-us",
    "en-gb",
    "fr-fr",
    "ja-jp",
    "ko-kr"
  ];

  useEffect(() => {
    AsyncStorage.getItem("mode").then((data) => { if (data != null) setMode(data); });
    AsyncStorage.getItem("locale").then((data) => { if (data != null) setLocale(data); });
  }, [mode, locale]);

  const toggleDarkMode = async () => {
    setMode(mode == "light" ? "dark" : "light");
    await AsyncStorage.setItem("mode", mode == "light" ? "dark" : "light");
  }

  const toggleLanguage = async () => {
    if (locale == "en-us") setLocale("ja-jp");
    else setLocale("en-us");
    await AsyncStorage.setItem("locale", locale == "en-us" ? "ja-jp" : "en-us");
  }

  const localeToLanguage = (locale: string) => {
    switch (locale) {
      case "en-us":
        return "English - US";
      case "en-gb":
        return "English - UK";
      case "fr-fr":
        return "French";
      case "ja-jp":
        return "Japanese";
      case "ko-kr":
        return "Korean";
      default:
        return "";
    }
  }

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={() => { close(); }}>
        {/* Title */}
        <Dialog.Title style={Styles.selfCentered}>Settings</Dialog.Title>

        {/* Content */}
        <Dialog.Content>
          <Button
            icon="theme-light-dark"
            mode="contained-tonal"
            style={Styles.selfCentered}
            onPress={toggleDarkMode}>
            Theme
          </Button>
          <LineBreak />
          <Button
            icon="earth"
            mode="contained-tonal"
            style={Styles.selfCentered}
            onPress={toggleLanguage}
          >
            {localeToLanguage(locale)}
          </Button>
          <LineBreak />
          <Text variant="labelLarge" style={Styles.selfCentered}>Changes applied on restart</Text>
        </Dialog.Content>

        {/* Actions */}
        <Dialog.Actions>
          <Button onPress={() => { close(); }}>Close</Button>
        </Dialog.Actions>

      </Dialog>
    </Portal>
  );
}

export default SettingsDialog;