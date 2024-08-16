import React from "react";
import { Avatar, Card, Text, ActivityIndicator, List } from "react-native-paper";
import { Image, ScrollView } from "react-native";
import LineBreak from "@/components/LineBreak";

interface IHeroDisplayFullProps {
  hero: {
    name: string,
    location: string,
    role: string,
    description: string,
    portrait: string,
    abilities: [],
    story: {}
  }
  | null
}

const HeroDisplayFull = ({ hero }: IHeroDisplayFullProps) => {
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

  const getAbilitiesIcon = () => {
    return <Avatar.Icon size={32} icon="set-all" />
  }

  const getStoryIcon = () => {
    return <Avatar.Icon size={32} icon="book" />
  }

  const getListImage = (uri: string) => {
    return <Avatar.Image source={{ uri: uri }} size={32} />
  }

  return (
    (
      !hero
        ?
        <ActivityIndicator animating={true} />
        :
        <ScrollView>
          <Card>
            <Card.Title
              titleVariant="titleLarge"
              title={hero.name}
              subtitle={hero.location}
              left={getHeroPortrait}
              right={getRoleIcon} />
            <Card.Content>
              <LineBreak />
              <Text variant="bodyMedium">{hero.description}</Text>

              <LineBreak />
              <List.AccordionGroup>
                {/* Abilities */}
                <List.Accordion title="Abilities" id="0" left={getAbilitiesIcon}>
                  {hero.abilities.map((ability) => {
                    return <List.Item
                      key={ability.name}
                      title={ability.name}
                      description={ability.description}
                      descriptionNumberOfLines={20}
                      left={() => getListImage(ability.icon)}
                    />
                  })}
                </List.Accordion>

                {/* Story */}
                <List.Accordion title="Story" id="1" left={getStoryIcon}>
                  <List.Item
                    title="Summary"
                    description={hero.story.summary}
                    descriptionNumberOfLines={20}
                    left={() => getListImage(hero.story.chapters[0].picture)}
                  />
                </List.Accordion>
              </List.AccordionGroup>
            </Card.Content>
          </Card>
        </ScrollView>
    )
  );
}

export default HeroDisplayFull;