import React from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import { Card, List } from "react-native-paper";
import UserCompetitiveDetailDisplay from "./UserCompetitiveDetailDisplay";

interface IUserSummary {
  username: string,
  avatar: string,
  namecard: string,
  title: string,
  endorsement: {},
  competitive: {}
}

interface IUserDisplayFullProps {
  user: {
    summary: IUserSummary,
    stats: {}
  } | null
}

const UserDisplayFull = ({ user }: IUserDisplayFullProps) => {
  const getAvatar = () => {
    if (!user) return <></>;
    return <Image
      source={{ uri: user.summary.avatar }}
      style={{ width: 48, height: 48, borderRadius: 12 }}
    />
  }

  const getNamecard = () => {
    if (!user) return <></>;
    return <Card.Cover
      source={{ uri: user.summary.namecard }}
      style={{ height: 64, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
    />
  }

  const getEndorsement = () => {
    if (!user) return <></>
    return <Image
      source={{ uri: user.summary.endorsement.frame }}
      style={{ width: 48, height: 48, borderRadius: 12, marginRight: 16 }}
    />
  }

  const competitiveDetail = user?.summary.competitive;

  return (
    (
      !user
        ?
        <ActivityIndicator animating={true} />
        :
        <ScrollView>
          <Card>
            {getNamecard()}
            <Card.Title
              titleVariant="titleLarge"
              title={user.summary.username}
              subtitle={user.summary.title}
              left={getAvatar}
              right={getEndorsement}
            />
            <Card.Content>
              {
                !competitiveDetail
                  ?
                  <ActivityIndicator animating={true} />
                  :
                  <List.Section title="Competitive Details">
                    <UserCompetitiveDetailDisplay detail={competitiveDetail.pc} title="PC" icon="laptop" />
                    <UserCompetitiveDetailDisplay detail={competitiveDetail.console} title="Console" icon="controller-classic" />
                  </List.Section>
              }
            </Card.Content>
          </Card>
        </ScrollView>
    )
  )
}

export default UserDisplayFull;