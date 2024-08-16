import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Searchbar, Text } from "react-native-paper";
import AppBar from "@/components/AppBar";
import LineBreak from "@/components/LineBreak";
import ModeDisplay from "@/components/ModeDisplay";
import Styles from "@/styles/Styles";

const Modes = () => {
  // List of modes
  const [modes, setModes] = useState([]);
  const [searchedModes, setSearchedModes] = useState(null);
  useEffect(() => {
    fetch("https://overfast-api.tekrop.fr/gamemodes")
      .then(data => data.json())
      .then(json => {
        setModes(json);
        if (!searchedModes) setSearchedModes(json);
      });
  }, [modes]);

  // Mode search by name
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length == 0) {
      setSearchedModes(modes);
      return;
    }
    setSearchedModes(modes.filter((mode) => mode.name.toLowerCase().includes(text.toLowerCase())));
  }

  return (
    <ScrollView>
      <AppBar title="Modes" icon="gamepad-variant" />
      <Searchbar
        placeholder="Search mode name"
        onChangeText={handleSearch}
        value={searchQuery}
        elevation={1}
      />
      <LineBreak />

      {
        modes.length > 0
          ?
          (
            searchedModes != null && searchedModes.length > 0
              ?
              searchedModes.map((mode) => {
                return <View key={mode.key}>
                  <ModeDisplay mode={mode} />
                  <LineBreak />
                </View>
              })
              :
              <Text variant="bodyMedium" style={Styles.selfCentered}>No mode matches search criteria</Text>
          )
          :
          <ActivityIndicator animating={true} />
      }
    </ScrollView>
  );
}

export default Modes;