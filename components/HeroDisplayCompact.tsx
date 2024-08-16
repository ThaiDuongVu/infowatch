import React from "react";
import { Avatar, Card, ActivityIndicator, TouchableRipple } from "react-native-paper";
import { Image } from "react-native";

interface IHeroDisplayCompactProps {
  hero: {
    key: string,
    name: string,
    role: string,
    portrait: string
  } | null,
  onPressed: Function
}

const HeroDisplayCompact = ({ hero, onPressed }: IHeroDisplayCompactProps) => {
  const getRoleIcon = () => {
    if (!hero) return <></>;
    var name = "";
    if (hero.role == "tank") name = "shield";
    else if (hero.role == "damage") name = "ammunition";
    else name = "medical-bag";
    return <Avatar.Icon size={48} icon={name} style={{ marginRight: 16 }} />
  }

  const getHeroPortrait = () => {
    if (!hero) return <></>;
    return <Image source={{ uri: hero.portrait }} style={{ width: 48, height: 48, borderRadius: 12 }} />
  }

  return (
    (
      !hero
        ?
        <ActivityIndicator animating={true} />
        :
        <TouchableRipple onPress={() => onPressed()}>
          <Card>
            <Card.Title
              titleVariant="titleLarge"
              title={hero.name}
              left={getHeroPortrait}
              right={getRoleIcon}
            />
          </Card>
        </TouchableRipple>
    )
  );
}

export default HeroDisplayCompact;