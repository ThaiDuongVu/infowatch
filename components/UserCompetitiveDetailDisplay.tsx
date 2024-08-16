import Styles from "@/styles/Styles";
import React from "react";
import { Image, View } from "react-native";
import { List, Text } from "react-native-paper";

interface IUserCompetitiveDetailDisplay {
  detail: {
    season: number,
    tank: {},
    damage: {},
    support: {},
    open: {}
  },
  title: string,
  icon: string
}

const UserCompetitiveDetailDisplay = ({ detail, title, icon }: IUserCompetitiveDetailDisplay) => {
  const getRank = (role: {}) => {
    if (!role) return "N/A";
    return `${role.division.charAt(0).toUpperCase() + role.division.slice(1)} ${role.tier}`;
  }
  const getRankImage = (role: {}) => {
    if (!role) return <></>
    const rankURL = role.rank_icon;
    const tierURL = role.tier_icon;
    return <View>
      <Image source={{ uri: rankURL }} style={{ width: 48, height: 48, alignSelf: "center" }} />
      <Image source={{ uri: tierURL }} style={{ width: 24, height: 24, alignSelf: "center" }} />
    </View>
  }

  return (
    (
      !detail
        ?
        <List.Accordion
          title={title}
          description="N/A"
          left={_ => <List.Icon {..._} icon={icon} />}>
          <></>
        </List.Accordion>
        :
        <List.Accordion
          title={title}
          description={`Season ${detail.season}`}
          left={_ => <List.Icon {..._} icon={icon} />}>
          <List.Item
            title="Tank"
            description={`${getRank(detail.tank)}`}
            left={_ => <List.Icon {..._} icon="shield" />}
            right={_ => getRankImage(detail.tank)}
          />
          <List.Item
            title="Damage"
            description={`${getRank(detail.damage)}`}
            left={_ => <List.Icon {..._} icon="ammunition" />}
            right={_ => getRankImage(detail.damage)}
          />
          <List.Item
            title="Support"
            description={`${getRank(detail.support)}`}
            left={_ => <List.Icon {..._} icon="medical-bag" />}
            right={_ => getRankImage(detail.support)}
          />
        </List.Accordion>
    )
  );
}

export default UserCompetitiveDetailDisplay;