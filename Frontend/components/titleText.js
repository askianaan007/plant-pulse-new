import React from "react";
import { View, StyleSheet, Text } from "react-native";

const TitleText = (props) => {
  return (
    <View style={styles.welcome}>
      <Text style={styles.welcomeText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    top: "10%",
    width: "100%",
    alignItems: "center",
  },

  welcomeText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default TitleText;
