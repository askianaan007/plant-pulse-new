import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React from "react";
import TitleText from "../../components/titleText";
import SubmitButton from "../../components/submitButton";
import FooterMenu from "../../components/menus/FooterMenu";

const Plants = ({ navigation, route }) => {
  const { post } = route.params;

  return (
    <ImageBackground
      source={require("../../assets/leaf back.jpg")}
      style={styles.backgroundImage}
    >
      <TitleText title={post?.title || "title"} />
      <View style={styles.container2}>
        <Text style={styles.name}>Water level</Text>
        <Text style={styles.water}>65%</Text>
        <SubmitButton
          btnTitle="Fill"
          // loading={loading}
          // handleSubmit={handleSubmit}
          buttonStyle={{ top: 120 }}
        />
      </View>
      <FooterMenu />
    </ImageBackground>
  );
};

export default Plants;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: "#31A05F",
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
  },
  container2: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    height: "50%",
    width: "100%",
    top: "45%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  image_container: {
    position: "absolute",
    // backgroundColor:"red",
    left: "30%",
    zIndex: 1,
    top: 200,
  },
  image: {
    height: 350,
    width: 250,
    // top: 150,
    left: 0,
  },
  name: {
    top: 60,
    fontSize: 35,
    fontWeight: "bold",
    color: "#214530",
    // textTransform: "uppercase",
  },
  water: {
    fontSize: 60,
    color: "#214530",
    fontWeight: "bold",
    textAlign: "center",
    top: 80,
  },
});
