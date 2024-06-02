import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  RefreshControl
} from "react-native";
import React, { useContext, useState, useEffect, useCallback} from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/menus/FooterMenu";
import HeaderMenu from "../components/menus/HeaderMenu";
import { PostContext } from "../context/postContext";
import MainPostCard from "../components/MainPostCard";
import axios from "axios";
import Alert from "../components/alert";

const MainScreen = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const [posts, setPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);



  // Function to fetch the latest data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get("https://plantpulse-backend.onrender.com/api/v1/posts/get-all-post");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);
  return (
    <ImageBackground
      source={require("../assets/leaf back.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 27,
              fontWeight: "bold",
            }}
          >
            Hi {state?.user.name} !
          </Text>
          <View
            style={{
              height: 60,
              width: 60,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HeaderMenu />
          </View>
        </View>
        <View>
          <Alert posts={posts} navigation={navigation}/>
        </View>
        <View
          style={{
            // width: "92%",
            height: 278,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: 20,
            marginTop: 20,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              overflow: "hidden",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <MainPostCard posts={posts} navigation={navigation} />
            </View>
          </View>
          <Text
            style={{ left: "82%", marginTop: 10, color: "#fff" }}
            onPress={() => navigation.navigate("AllPlants")}
          >
            See all
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            height: 140,
            borderRadius: 20,
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom:100
          }}
        >
          <View style={{ marginLeft: 20, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => navigation.navigate("AllPlants")}
            >
              <Entypo name="water" size={30} color="#eecf65" />
            </TouchableOpacity>
            <Text style={styles.menuText}>watering</Text>
          </View>
          <View style={{ marginLeft: 40, alignItems: "center" }}>
            <TouchableOpacity style={styles.menuBtn}
            onPress={() => navigation.navigate("Weather")}>
              <FontAwesome5 name="temperature-high" size={30} color="#eecf65" />
            </TouchableOpacity>
            <Text style={styles.menuText}>Weather</Text>
          </View>
          <View style={{ marginLeft: 40, alignItems: "center" }}>
            <TouchableOpacity style={styles.menuBtn}>
              <AntDesign name="calendar" size={30} color="#eecf65" />
            </TouchableOpacity>
            <Text style={styles.menuText}>Schedule</Text>
          </View>
        </View>
    </ScrollView>
      </View>
        <FooterMenu />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "25%",
    paddingLeft:20,
    paddingRight:20,
  },

  profile: {
    width: 60,
    height: 60,
    borderRadius: 99,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "black",
  },
  sliderContent: {
    width: 135,
    height: 216,
    borderRadius: 8,
    backgroundColor: "#31A05F",
    marginLeft: 10,
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
});
export default MainScreen;
