import React, { } from "react";
import { Button, Portal, Dialog, ActivityIndicator } from "react-native-paper";
import { ScrollView, Image } from "react-native";
import Styles from "@/styles/Styles";

interface IMapDialogProps {
  isVisible: boolean,
  close: Function,
  map: any
}

const MapDialog = ({ isVisible, close, map }: IMapDialogProps) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={() => close()}>
        {/* Title */}
        <Dialog.Title style={Styles.selfCentered}>Screenshot</Dialog.Title>

        {/* Content */}
        <Dialog.ScrollArea>
          <ScrollView>
            {
              !map
                ?
                <ActivityIndicator animating={true}/>
                :
                <Image
                  source={{ uri: map.screenshot }}
                  style={{ width: 256, height: 256, borderRadius: 12, alignSelf: "center" }} />
            }
          </ScrollView>
        </Dialog.ScrollArea>

        {/* Actions */}
        <Dialog.Actions>
          <Button onPress={() => { close(); }}>Close</Button>
        </Dialog.Actions>

      </Dialog>
    </Portal>
  );
}

export default MapDialog;