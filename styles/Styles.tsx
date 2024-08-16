import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  selfCentered: {
    alignSelf: "center",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    gap: 16
  }
});

export default Styles;