import React from "react";
import { ActivityIndicator, Image } from "react-native";
import { TouchableRipple, Card, Text } from "react-native-paper";

interface IUserDisplayProps {
  user: {
    player_id: string,
    name: string,
    avatar: string,
    namecard: string,
    title: string,
    career_url: string
  } | null,
  onPressed: Function
}

const UserDisplayCompact = ({ user, onPressed }: IUserDisplayProps) => {
  const getAvatar = () => {
    if (!user) return <></>;
    return <Image
      source={{ uri: user.avatar }}
      style={{ width: 48, height: 48, borderRadius: 12 }}
    />
  }

  const getNamecard = () => {
    if (!user) return <></>;
    return <Card.Cover
      source={{ uri: user.namecard }}
      style={{ height: 64, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
    />
  }

  return (
    (
      !user
        ?
        <ActivityIndicator animating={true} />
        :
        <TouchableRipple onPress={() => onPressed()}>
          <Card>
            {getNamecard()}
            <Card.Title
              titleVariant="titleLarge"
              title={user.name}
              subtitle={user.title}
              left={getAvatar}
            />
          </Card>
        </TouchableRipple>
    )
  );
}

export default UserDisplayCompact;