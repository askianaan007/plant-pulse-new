import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/menus/FooterMenu";
import HeaderMenu from "../components/menus/HeaderMenu";
import { PostContext } from "../context/postContext";

const MainScreen = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const [posts] = useContext(PostContext);
  return (
    <ImageBackground
      source={require("../assets/leaf back.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
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
          {/* <Text>{JSON.stringify(state, null, 4)}</Text> */}
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
        <TouchableOpacity
          style={{
            backgroundColor: "#FFA900",
            width: "92%",
            height: 130,
            borderRadius: 20,
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
          }}
          onPress={() => navigation.navigate("Plants")}
        >
          <Image source={require("../assets/Images/low.png")}></Image>
          <View style={{ width: 200, paddingLeft: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}>
              Teena is very thirsty! Please provide water promptly
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: "#BE0D0D",
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Water level 17%
            </Text>
          </View>
          <Image source={require("../assets/Images/tree111.png")}></Image>
        </TouchableOpacity>
        <View
          style={{
            width: "92%",
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={{ ...styles.sliderContent, backgroundColor: "#A03131" }}
                onPress={() => navigation.navigate("Plants")}
              >
                <View style={styles.sliderContent11}>
                  <Text style={styles.sliderMainText}>Not Healthy</Text>
                  <Image
                    source={require("../assets/Images/image2.png")}
                    style={styles.sliderImage}
                  ></Image>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.slidersubText1}>Teena</Text>
                  <Text style={styles.slidersubText1}>17% Water level</Text>
                  <Text style={styles.slidersubText1}>Temp : 35°C</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sliderContent}
                onPress={() => navigation.navigate("Plants")}
              >
                <View style={styles.sliderContent11}>
                  <Text style={styles.sliderMainText}>Not Healthy</Text>
                  <Image
                    source={require("../assets/Images/image2.png")}
                    style={styles.sliderImage}
                  ></Image>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.slidersubText1}>Teena</Text>
                  <Text style={styles.slidersubText1}>17% Water level</Text>
                  <Text style={styles.slidersubText1}>Temp : 35°C</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.sliderContent, backgroundColor: "#FFA900" }}
                onPress={() => navigation.navigate("Plants")}
              >
                <View style={styles.sliderContent11}>
                  <Text style={styles.sliderMainText}>Not Healthy</Text>
                  <Image
                    source={require("../assets/Images/image2.png")}
                    style={styles.sliderImage}
                  ></Image>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.slidersubText1}>Teena</Text>
                  <Text style={styles.slidersubText1}>17% Water level</Text>
                  <Text style={styles.slidersubText1}>Temp : 35°C</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
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
            width: "92%",
            height: 140,
            borderRadius: 20,
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ marginLeft: 20, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => navigation.navigate("addPlants")}
            >
              <Entypo name="water" size={30} color="#eecf65" />
            </TouchableOpacity>
            <Text style={styles.menuText}>watering</Text>
          </View>
          <View style={{ marginLeft: 40, alignItems: "center" }}>
            <TouchableOpacity style={styles.menuBtn}>
              <FontAwesome5 name="temperature-high" size={30} color="#eecf65" />
            </TouchableOpacity>
            <Text style={styles.menuText}>Humidity</Text>
          </View>
          <View style={{ marginLeft: 40, alignItems: "center" }}>
            <TouchableOpacity style={styles.menuBtn}>
              <AntDesign name="calendar" size={30} color="#eecf65" />
            </TouchableOpacity>
            <Text style={styles.menuText}>Schedule</Text>
          </View>
        </View>
        <FooterMenu />
      </View>
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
    // justifyContent: "center",
    paddingTop: "15%",
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

  slidersubText1: {
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
});
export default MainScreen;
