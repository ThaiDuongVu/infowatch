import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "./Home";
import Heroes from "./Heroes";
import Maps from "./Maps";
import Modes from "./Modes";
import Users from "./Users";

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home", focusedIcon: "home" },
    { key: "heroes", title: "Heroes", focusedIcon: "account-group" },
    { key: "maps", title: "Maps", focusedIcon: "map" },
    { key: "modes", title: "Modes", focusedIcon: "gamepad-variant" },
    { key: "users", title: "Users", focusedIcon: "account" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    heroes: Heroes,
    maps: Maps,
    modes: Modes,
    users: Users,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  );
}

export default App;