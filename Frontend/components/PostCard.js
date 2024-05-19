import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";


const PostCard = ({ posts, navigation }) => {
  return (
    <View>
      {posts?.map((post, i) => (
        <View key={i}>
          <TouchableOpacity
            style={{
              ...styles.sliderContent,
              backgroundColor: getBackgroundColor(post.waterLevel),
            }}
            onPress={() => navigation.navigate("Plants", { post: post })}
          >
            <View style={styles.sliderContent11}>
              <Text style={styles.sliderMainText}>Not Healthy</Text>
              <Image
                source={require("../assets/Images/image2.png")}
                style={styles.sliderImage}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.slidersubText1}>Name: {post?.title}</Text>
              <Text style={styles.slidersubText1}>
                Water level {post?.waterLevel}%
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
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


export default PostCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#31A05F",
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  container2: {
    backgroundColor: "#fff",
    // height: "100%",
    width: "100%",
    top: "15%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // alignItems: "center",
  },
  scroll: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  slider: {
    width: "100%",
    // height: "100%",
    padding: 30,
  },

  mainText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#31A05F",
    marginLeft: 20,
  },
  sliderContent: {
    width: 150,
    height: 220,
    borderRadius: 8,
    backgroundColor: "#31A05F",
    marginLeft: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderMainText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  sliderImage: {
    width: 100,
    height: 110,
    resizeMode: "contain",
  },

  slidersubText1: {
    color: "#fff",
    fontSize: 15,
  },
});
