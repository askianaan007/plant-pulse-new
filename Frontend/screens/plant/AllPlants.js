import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import TitleText from "../../components/titleText";
import PostCard from "../../components/PostCard";
import { PostContext } from "../../context/postContext";
import { AuthContext } from "../../context/authContext";
import FooterMenu from "../../components/menus/FooterMenu";
import axios from "axios";

const AllPlants = ({ navigation }) => {
  const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {}, [getAllPosts]);
  //refresh controll
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts;
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/leaf back.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}></View>
      <TitleText title={"IOT Watering"} />

      <View style={styles.container2}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.title}>
            <Text style={styles.mainText}>Please select your plant</Text>
            <Text style={styles.mainText}>Total Plants {posts?.length}</Text>
          </View>
          <View style={styles.slider}>
            <PostCard posts={posts} navigation={navigation} />
          </View>
        </ScrollView>
      </View>
      <FooterMenu />
    </ImageBackground>
  );
};

export default AllPlants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
    position: "absolute",
    alignItems: "center",
  },
  container2: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
    color: "#fff",
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

  title: { marginTop: 10, marginLeft: 20 },
});
