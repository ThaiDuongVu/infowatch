import React, { useState } from "react";
import { ScrollView, Image } from "react-native";
import { Text, Divider, Card, Button, Avatar } from "react-native-paper";
import LineBreak from "@/components/LineBreak";
import SettingsDialog from "@/components/SettingsDialog";
import AboutDialog from "@/components/AboutDialog";
import Styles from "@/styles/Styles";

const Home = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  return (
    <ScrollView>
      {/* <AppBar title="" icon="" /> */}
      <LineBreak />
      <LineBreak />
      <Card>
        <Card.Title style={Styles.selfCentered} titleVariant="titleLarge" title="InfoWatch" />
        <Card.Content>
          <Divider />
          <Text variant="titleMedium" style={Styles.selfCentered}>Overwatch heroes, modes, maps, and users.</Text>
          <LineBreak />
          <Image style={Styles.logo} source={require("../assets/images/ow_icon.png")} />
          <LineBreak />
        </Card.Content>
      </Card>

      <LineBreak />

      <Button
        icon="cog"
        mode="contained-tonal"
        style={Styles.selfCentered}
        onPress={() => { setSettingsVisible(true); }}>
        Settings
      </Button>
      <LineBreak />
      <Button
        icon="information"
        mode="contained-tonal"
        style={Styles.selfCentered} onPress={() => { setAboutVisible(true); }}>
        About
      </Button>

      <SettingsDialog isVisible={settingsVisible} close={() => { setSettingsVisible(false); }} />
      <AboutDialog isVisible={aboutVisible} close={() => { setAboutVisible(false); }} />

    </ScrollView>
  );
}

export default Home;