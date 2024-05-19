import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TitleText from "../../components/titleText";
import PostCard from "../../components/PostCard";
import { PostContext } from "../../context/postContext";
import { AuthContext } from "../../context/authContext";
import FooterMenu from "../../components/menus/FooterMenu";

const AllPlants = ({ navigation }) => {
  const [posts] = useContext(PostContext);

  return (
    <View style={styles.container}>
      <TitleText title={"IOT Watering"} />
      <Text style={styles.mainText}>Please select your plant</Text>
      <Text>Total posts {posts?.length}</Text>

      <View style={styles.container2}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.slider}>
            <PostCard posts={posts} navigation={navigation} />
          </View>
        </ScrollView>
      </View>
      <FooterMenu />
    </View>
  );
};

export default AllPlants;

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
    height: "70%",
    width: "100%",
    top: "15%",
    marginBottom: 100,
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
    height: "100%",
    padding: 30,
    paddingBottom: 70,
  },

  mainText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    marginTop: 20,
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
