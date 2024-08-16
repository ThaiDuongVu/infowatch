import React, { } from "react";
import { Button, Portal, Dialog, ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native";
import Styles from "@/styles/Styles";
import UserDisplayFull from "./UserDisplayFull";

interface IUserDialogProps {
  isVisible: boolean,
  close: Function,
  user: any
}

const UserDialog = ({ isVisible, close, user }: IUserDialogProps) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={() => close()}>
        {/* Title */}
        <Dialog.Title style={Styles.selfCentered}>User Details</Dialog.Title>

        {/* Content */}
        <Dialog.ScrollArea>
          <ScrollView>
            {
              !user
              ?
              <ActivityIndicator animating={true}/>
              :
              <UserDisplayFull user={user} />
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

export default UserDialog;