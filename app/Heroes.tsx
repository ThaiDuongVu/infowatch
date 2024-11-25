import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Searchbar, Banner, ActivityIndicator, Text, Checkbox, Chip } from "react-native-paper";
import AppBar from "@/components/AppBar";
import LineBreak from "@/components/LineBreak";
import HeroDisplayCompact from "@/components/HeroDisplayCompact";
import HeroDialog from "@/components/HeroDialog";
import Styles from "@/styles/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Heroes = () => {
  // List of heroes
  const [heroes, setHeroes] = useState([]);
  const [searchedHeroes, setSearchedHeroes] = useState(null);
  const [filteredHeroes, setFilteredHeroes] = useState(null);
  useEffect(() => {
    fetch("https://overfast-api.tekrop.fr/heroes")
      .then(data => data.json())
      .then(json => {
        setHeroes(json);
        if (!searchedHeroes) setSearchedHeroes(json);
        if (!filteredHeroes) setFilteredHeroes(json);
      }
      );
  }, [heroes]);

  // Hero dialog
  const [heroDialogVisible, setHeroDialogVisible] = useState(false);
  const [hero, setHero] = useState(null);

  // Hero search by name
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length == 0) {
      setSearchedHeroes(heroes);
      return;
    }
    setSearchedHeroes(heroes.filter((hero) => hero.name.toLowerCase().includes(text.toLowerCase())));
  }

  // Hero filter by role
  const [tanksSelected, setTanksSelected] = useState(false);
  const [dpsSelected, setDpsSelected] = useState(false);
  const [supportSelected, setSupportSelected] = useState(false);
  const handleFilter = () => {
    if (!tanksSelected && !dpsSelected && !supportSelected) {
      setFilteredHeroes(searchedHeroes);
      return;
    }

    var heroes = searchedHeroes;
    if (!tanksSelected) heroes = heroes.filter((hero) => hero.role != "tank");
    if (!dpsSelected) heroes = heroes.filter((hero) => hero.role != "damage");
    if (!supportSelected) heroes = heroes.filter((hero) => hero.role != "support");

    setFilteredHeroes(heroes);
  }
  useEffect(() => {
    handleSearch(searchQuery);
    handleFilter();
  }, [searchQuery, tanksSelected, dpsSelected, supportSelected]);

  const [locale, setLocale] = useState("en-us");
  useEffect(() => {
    AsyncStorage.getItem("locale").then((data) => { if (data != null) setLocale(data); });
    console.log(locale);
  }, [locale]);

  return (
    <ScrollView>
      <AppBar title="Heroes" icon="account-group" />
      <Searchbar
        placeholder="Search hero name"
        onChangeText={handleSearch}
        value={searchQuery}
        elevation={1}
      />
      <LineBreak />
      <View style={Styles.container}>
        <Chip
          icon={tanksSelected ? "check" : "shield"}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={tanksSelected}
          onPress={() => setTanksSelected(!tanksSelected)}>
          Tanks</Chip>
        <Chip
          icon={dpsSelected ? "check" : "ammunition"}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={dpsSelected}
          onPress={() => setDpsSelected(!dpsSelected)}>Damage</Chip>
        <Chip
          icon={supportSelected ? "check" : "medical-bag"}
          style={Styles.selfCentered}
          showSelectedOverlay={true}
          selected={supportSelected}
          onPress={() => setSupportSelected(!supportSelected)}>Support</Chip>
      </View>
      <LineBreak />

      {
        heroes.length > 0
          ?
          (
            filteredHeroes != null && filteredHeroes.length > 0
              ?
              filteredHeroes.map((hero) => {
                return <View key={hero.key}>
                  <HeroDisplayCompact
                    hero={hero}
                    onPressed={() => {
                      fetch(`https://overfast-api.tekrop.fr/heroes/${hero.key}?locale=${locale}`)
                        .then(data => data.json())
                        .then(json => setHero(json)
                        );
                      setHeroDialogVisible(true);
                    }} />
                  <LineBreak />
                </View>
              })
              :
              <Text variant="bodyMedium" style={Styles.selfCentered}>No hero matches search criteria</Text>
          )
          :
          <ActivityIndicator animating={true} />
      }
      <HeroDialog isVisible={heroDialogVisible} close={() => setHeroDialogVisible(false)} hero={hero} />

    </ScrollView>
  );
}

export default Heroes;