import React, { } from "react";
import { Button, Portal, Dialog, ActivityIndicator } from "react-native-paper";
import HeroDisplayFull from "@/components/HeroDisplayFull";
import { ScrollView } from "react-native";
import Styles from "@/styles/Styles";

interface IHeroDialogProps {
  isVisible: boolean,
  close: Function,
  hero: any
}

const HeroDialog = ({ isVisible, close, hero }: IHeroDialogProps) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={() => close()}>
        {/* Title */}
        <Dialog.Title style={Styles.selfCentered}>Hero Details</Dialog.Title>

        {/* Content */}
        <Dialog.ScrollArea>
          <ScrollView>
            {
              !hero
                ?
                <ActivityIndicator animating={true} />
                :
                <HeroDisplayFull hero={hero} />
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

export default HeroDialog;