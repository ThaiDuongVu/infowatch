import React, { useState, useEffect } from "react";
import { ActivityIndicator, Avatar, Chip, Searchbar, Text } from "react-native-paper";
import { ScrollView, View } from "react-native";
import AppBar from "@/components/AppBar";
import LineBreak from "@/components/LineBreak";
import MapDisplay from "@/components/MapDisplay";
import Styles from "@/styles/Styles";
import MapDialog from "@/components/MapDialog";

const Maps = () => {
  // List of maps
  const [maps, setMaps] = useState([]);
  const [searchedMaps, setSearchedMaps] = useState(null);
  const [filteredMaps, setFilteredMaps] = useState(null);
  useEffect(() => {
    fetch("https://overfast-api.tekrop.fr/maps")
      .then(data => data.json())
      .then(json => {
        setMaps(json);
        if (!searchedMaps) setSearchedMaps(json);
        if (!filteredMaps) setFilteredMaps(json);
      });
  }, [maps]);

  // Map search by name
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length == 0) {
      setSearchedMaps(maps);
      return;
    }
    setSearchedMaps(maps.filter((map) => map.name.toLowerCase().includes(text.toLowerCase())));
  }

  const [map, setMap] = useState(null);
  const [mapDialogVisible, setMapDialogVisible] = useState(false);

  const modeIconsData = require("../data/modeIconsData.json");
  const getModeIcon = (mode: string) => {
    return <Avatar.Image source={{ uri: modeIconsData[mode] }} size={24} />
  }

  // Map filter by mode
  const [assaultSelected, setAssaultSelected] = useState(false);
  const [ctfSelected, setCtfSelected] = useState(false);
  const [controlSelected, setControlSelected] = useState(false);
  const [deathmatchSelected, setDeathmatchSelected] = useState(false);
  const [eliminationSelected, setEliminationSelected] = useState(false);
  const [escortSelected, setEscortSelected] = useState(false);
  const [flashpointSelected, setFlashpointSelected] = useState(false);
  const [hybridSelected, setHybridSelected] = useState(false);
  const [pushSelected, setPushSelected] = useState(false);
  const [teamDeathmatchSelected, setTeamDeathmatchSelected] = useState(false);
  const handleFilter = () => {
    if (!assaultSelected &&
      !ctfSelected &&
      !controlSelected &&
      !deathmatchSelected &&
      !eliminationSelected &&
      !escortSelected &&
      !flashpointSelected &&
      !hybridSelected &&
      !pushSelected &&
      !teamDeathmatchSelected) {
      setFilteredMaps(searchedMaps);
      return;
    }

    var maps = searchedMaps;
    if (!assaultSelected) maps = maps.filter((map) => !map.gamemodes.includes("assault"));
    if (!ctfSelected) maps = maps.filter((map) => !map.gamemodes.includes("capture-the-flag"));
    if (!controlSelected) maps = maps.filter((map) => !map.gamemodes.includes("control"));
    if (!deathmatchSelected) maps = maps.filter((map) => !map.gamemodes.includes("deathmatch"));
    if (!eliminationSelected) maps = maps.filter((map) => !map.gamemodes.includes("elimination"));
    if (!escortSelected) maps = maps.filter((map) => !map.gamemodes.includes("escort"));
    if (!flashpointSelected) maps = maps.filter((map) => !map.gamemodes.includes("flashpoint"));
    if (!hybridSelected) maps = maps.filter((map) => !map.gamemodes.includes("hybrid"));
    if (!pushSelected) maps = maps.filter((map) => !map.gamemodes.includes("push"));
    if (!teamDeathmatchSelected) maps = maps.filter((map) => !map.gamemodes.includes("team-deathmatch"));

    setFilteredMaps(maps);
  }
  useEffect(() => {
    handleSearch(searchQuery);
    handleFilter();
  }, [searchQuery,
    assaultSelected,
    ctfSelected,
    controlSelected,
    deathmatchSelected,
    eliminationSelected,
    escortSelected,
    flashpointSelected,
    hybridSelected,
    pushSelected,
    teamDeathmatchSelected]);

  return (
    <ScrollView>
      <AppBar title="Maps" icon="map" />
      <Searchbar
        placeholder="Search map name"
        onChangeText={handleSearch}
        value={searchQuery}
        elevation={1}
      />
      <LineBreak />
      <View style={Styles.container}>
        <Chip
          avatar={getModeIcon("assault")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={assaultSelected}
          onPress={() => setAssaultSelected(!assaultSelected)}>
          Assault</Chip>
        <Chip
          avatar={getModeIcon("capture-the-flag")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={ctfSelected}
          onPress={() => setCtfSelected(!ctfSelected)}>
          Capture the Flag</Chip>
        <Chip
          avatar={getModeIcon("control")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={controlSelected}
          onPress={() => setControlSelected(!controlSelected)}>
          Control</Chip>
        <Chip
          avatar={getModeIcon("deathmatch")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={deathmatchSelected}
          onPress={() => setDeathmatchSelected(!deathmatchSelected)}>
          Deathmatch</Chip>
        <Chip
          avatar={getModeIcon("elimination")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={eliminationSelected}
          onPress={() => setEliminationSelected(!eliminationSelected)}>
          Elimination</Chip>
        <Chip
          avatar={getModeIcon("escort")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={escortSelected}
          onPress={() => setEscortSelected(!escortSelected)}>
          Escort</Chip>
        <Chip
          avatar={getModeIcon("flashpoint")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={flashpointSelected}
          onPress={() => setFlashpointSelected(!flashpointSelected)}>
          Flashpoint</Chip>
        <Chip
          avatar={getModeIcon("hybrid")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={hybridSelected}
          onPress={() => setHybridSelected(!hybridSelected)}>
          Hybrid</Chip>
        <Chip
          avatar={getModeIcon("push")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={pushSelected}
          onPress={() => setPushSelected(!pushSelected)}>
          Push</Chip>
        <Chip
          avatar={getModeIcon("team-deathmatch")}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={teamDeathmatchSelected}
          onPress={() => setTeamDeathmatchSelected(!teamDeathmatchSelected)}>
          Team Deathmatch</Chip>
      </View>
      <LineBreak />

      {
        maps.length > 0
          ?
          (
            filteredMaps != null && filteredMaps.length > 0
              ?
              filteredMaps.map((map) => {
                return <View key={map.name}>
                  <MapDisplay
                    map={map}
                    onPressed={() => {
                      setMap(map);
                      setMapDialogVisible(true);
                    }} />
                  <LineBreak />
                </View>
              })
              :
              <Text variant="bodyMedium" style={Styles.selfCentered}>No map matches search criteria</Text>
          )
          :
          <ActivityIndicator animating={true} />
      }
      <MapDialog isVisible={mapDialogVisible} close={() => setMapDialogVisible(false)} map={map} />

    </ScrollView>
  );
}

export default Maps;