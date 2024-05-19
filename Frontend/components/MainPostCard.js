import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";

const MainPostCard = ({ posts, navigation }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {posts?.map((post, i) => (
        <View key={i}>
          <TouchableOpacity
            style={{
              ...styles.sliderContent,
              backgroundColor: getBackgroundColor(post.waterLevel),
            }}
            onPress={() => navigation.navigate("Plants")}
          >
            <View style={styles.sliderContent11}>
              <Text style={styles.sliderMainText}>
                {getHealthStatus(post.waterLevel)}
              </Text>
              <Image
                source={require("../assets/Images/image2.png")}
                style={styles.sliderImage}
              ></Image>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.sliderSubText1}>{post?.title}</Text>
              <Text style={styles.sliderSubText1}>
                {post?.waterLevel}% Water level
              </Text>
              <Text style={styles.sliderSubText1}>Temp : 35°C</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const getBackgroundColor = (waterLevel) => {
  if (waterLevel <= 35) {
    return "#A03131";
  } else if (waterLevel <= 70) {
    return "#FFA900";
  } else {
    return "#31A05F";
  }
};

const getHealthStatus = (waterLevel) => {
  if (waterLevel <= 35) {
    return "Not Healthy";
  } else if (waterLevel <= 70) {
    return "Average";
  } else {
    return "Healthy";
  }
};

const styles = StyleSheet.create({
  sliderContent11: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  sliderMainText: {
    fontSize: 18,
    color: "#fff",
    transform: [{ rotate: "-90deg" }],
    marginLeft: -20,
  },
  sliderImage: {
    width: 130,
    height: 140,
    resizeMode: "contain",
    marginLeft: -40,
  },

  sliderSubText1: {
    color: "#fff",
    fontSize: 15,
  },
  menuBtn: {
    backgroundColor: "#214530",
    height: 80,
    width: 80,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    fontSize: 15,
    marginTop: 5,
    color: "#fff",
  },
  sliderContent: {
    width: 135,
    height: 216,
    borderRadius: 8,
    backgroundColor: "#31A05F",
    marginLeft: 10,
  },
});

export default MainPostCard;
