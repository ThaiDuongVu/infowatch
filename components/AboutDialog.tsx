import React, { } from "react";
import { Text, Button, Portal, Dialog } from "react-native-paper";
import Styles from "@/styles/Styles";
import LineBreak from "./LineBreak";
import { Image } from "react-native";

interface IAboutDialogProps {
  isVisible: boolean,
  close: Function
}

const AboutDialog = ({ isVisible, close }: IAboutDialogProps) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={() => { close(); }}>
        {/* Title */}
        <Dialog.Title style={Styles.selfCentered}>About</Dialog.Title>

        {/* Content */}
        <Dialog.Content>
          <Text variant="bodyMedium" style={Styles.selfCentered}>
            InfoWatch developed by Duong Vu
          </Text>
          <Text variant="bodyMedium" style={Styles.selfCentered}>
            Data provided by OverFast API
          </Text>
          <LineBreak />
          <Image
            source={{ uri: "https://files.tekrop.fr/overfast_api_logo_full_1000.png" }}
            style={{ width: 128, height: 64, alignSelf: "center" }} />
        </Dialog.Content>

        {/* Actions */}
        <Dialog.Actions>
          <Button onPress={() => { close(); }}>Close</Button>
        </Dialog.Actions>

      </Dialog>
    </Portal>
  );
}

export default AboutDialog;