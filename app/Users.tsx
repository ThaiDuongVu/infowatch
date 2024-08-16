import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Searchbar, Text } from "react-native-paper";
import AppBar from "@/components/AppBar";
import LineBreak from "@/components/LineBreak";
import Styles from "@/styles/Styles";
import UserDisplayCompact from "@/components/UserDisplayCompact";
import UserDialog from "@/components/UserDialog";

const Users = () => {
  const [users, setUsers] = useState([]);

  // User search by name
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length == 0) {
      setUsers([]);
      return;
    }

    fetch(`https://overfast-api.tekrop.fr/players?name=${text}`)
      .then(data => data.json())
      .then(json => setUsers(json.results));
  }

  const [userDialogVisible, setUserDialogVisible] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <ScrollView>
      <AppBar title="Users" icon="account" />
      <Searchbar
        placeholder="Search user name"
        onChangeText={handleSearch}
        value={searchQuery}
        elevation={1}
      />
      <LineBreak />

      {
        users.length > 0
          ?
          (
            users.map((user) => {
              return <View key={user.player_id}>
                <UserDisplayCompact
                  user={user}
                  onPressed={() => {
                    fetch(user.career_url)
                      .then(data => data.json())
                      .then(json => setUser(json));
                    setUserDialogVisible(true);
                  }} />
                <LineBreak />
              </View>
            })
          )
          :
          (
            searchQuery.length > 0
              ?
              <Text variant="bodyMedium" style={Styles.selfCentered}>No user matches search criteria</Text>
              :
              <Text variant="bodyMedium" style={Styles.selfCentered}>Start by searching for a user</Text>
          )
      }
      <UserDialog isVisible={userDialogVisible} close={() => setUserDialogVisible(false)} user={user} />

    </ScrollView>
  )
}

export default Users;