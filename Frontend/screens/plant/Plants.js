import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import TitleText from "../../components/titleText";
import SubmitButton from "../../components/submitButton";
import FooterMenu from "../../components/menus/FooterMenu";

const Plants = ({ route }) => {
  const { post } = route.params;
  const [loading, setLoading] = useState(false);
  const [waterLevel, setWaterLevel] = useState(post?.waterLevel || 0);

  const handleSubmit = async () => {
    if (!post?._id) {
      alert("Post ID is missing.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`https://plantpulse-backend.onrender.com/api/v1/posts/fill-water-level/${post._id}`);
      setWaterLevel(100); // Update the water level state directly
      setLoading(false);
      alert("Water level updated to 100%");
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Error updating water level");
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/leaf back.jpg")}
      style={styles.backgroundImage}
    >
      <TitleText title={post?.title || "Title"} />
      <View style={styles.container2}>
        <Text style={styles.name}>Water level</Text>
        <Text
          style={{
            fontSize: 60,
            color: getBackgroundColor(waterLevel),
            fontWeight: "bold",
            textAlign: "center",
            top: 80,
          }}
        >
          {waterLevel}%
        </Text>
        <SubmitButton
          btnTitle="Fill"
          loading={loading}
          handleSubmit={handleSubmit}
          buttonStyle={{ top: 120 }}
        />
      </View>
      <FooterMenu />
    </ImageBackground>
  );
};

const getBackgroundColor = (waterLevel) => {
  if (waterLevel <= 35) {
    return "#BE0D0D";
  } else if (waterLevel <= 70) {
    return "#FFA900";
  } else {
    return "#31A05F";
  }
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: "#31A05F",
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  container2: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "50%",
    width: "100%",
    top: "45%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  name: {
    top: 60,
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Plants;
