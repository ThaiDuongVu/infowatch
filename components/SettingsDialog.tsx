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
  useEffect(() => {
    AsyncStorage.getItem("mode").then((data) => { if (data != null) setMode(data); });
  }, [mode]);

  const toggleDarkMode = async () => {
    await AsyncStorage.setItem("mode", mode == "light" ? "dark" : "light");
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