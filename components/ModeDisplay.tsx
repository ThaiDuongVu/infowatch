import React from "react";
import { ActivityIndicator, Avatar, Card, TouchableRipple } from "react-native-paper";
import { Image } from "react-native";
import { SvgUri } from "react-native-svg";

interface IModeDisplayProps {
  mode: {
    name: string,
    description: string,
    screenshot: string,
    icon: string
  } | null
}

const ModeDisplay = ({ mode }: IModeDisplayProps) => {
  const getModeScreenshot = () => {
    if (!mode) return <></>;
    return <Image source={{ uri: mode.screenshot }} style={{ width: 72, height: 72, borderRadius: 12 }} />
  }

  const getIcon = () => {
    if (!mode) return <></>;
    return <SvgUri width="32" height="32" uri={mode.icon} />
    // return <Avatar.Image source={{ uri: mode.icon }} size={32} />
  }

  return (
    (
      !mode
        ?
        <ActivityIndicator animating={true} />
        :
        <TouchableRipple onPress={() => { }}>
          <Card>
            <Card.Title
              titleVariant="titleLarge"
              title={mode.name}
              subtitle={mode.description}
              subtitleNumberOfLines={20}
              left={getIcon}
              right={getModeScreenshot}
            />
          </Card>
        </TouchableRipple>
    )
  );
}

export default ModeDisplay;