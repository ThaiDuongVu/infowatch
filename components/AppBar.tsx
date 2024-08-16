import React from "react";
import { Appbar } from "react-native-paper";

interface AppBarProps {
  title: string,
  icon: string
}

const AppBar = ({ title, icon }: AppBarProps) => {
  return (
    <Appbar.Header>
      {/* <Appbar.BackAction onPress={() => { }} /> */}
      <Appbar.Content title={title} />
      <Appbar.Action icon={icon} onPress={() => { }} />
    </Appbar.Header>
  );
}

export default AppBar;