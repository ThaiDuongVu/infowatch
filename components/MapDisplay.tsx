import React from "react";
import { ActivityIndicator, Card, Text, TouchableRipple } from "react-native-paper";
import { Image } from "react-native";

interface IMapDisplayProps {
  map: {
    name: string,
    screenshot: string,
    gamemodes: [],
    location: string,
    country_code: string
  } | null,
  onPressed: Function
}

const MapDisplay = ({ map, onPressed }: IMapDisplayProps) => {
  const getFlagEmoji = () => {
    if (!map?.country_code) return "";
    const codePoints = map.country_code.toUpperCase().split("").map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  const getFlag = () => {
    return <Text variant="titleLarge">{getFlagEmoji()}</Text>
  }

  const getMapScreenshot = () => {
    if (!map) return <></>;
    return <Image source={{ uri: map.screenshot }} style={{ width: 72, height: 72, borderRadius: 12 }} />
  }

  return (
    (
      !map
        ?
        <ActivityIndicator animating={true} />
        :
        <TouchableRipple onPress={() => onPressed()}>
          <Card>
            <Card.Title
              titleVariant="titleLarge"
              title={`${map.name} ${getFlagEmoji()}`}
              subtitle={map.location}
              // left={getFlag}
              right={getMapScreenshot}
            />
          </Card>
        </TouchableRipple>
    )
  );
}

export default MapDisplay;