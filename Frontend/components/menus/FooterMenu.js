import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          style={styles.iconStyle}
          color={route.name === "Home" ? "#eecf65" : "#caddaa"}
        />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: 70,
          width: 70,
          backgroundColor: "#eecf64",
          borderRadius: 100,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          bottom: 10,
          left: "55%",
        }}
        onPress={() => navigation.navigate("AddPlant")}
      >
        <FontAwesome5
          name="plus"
          style={{
            marginBottom: 3,
            alignSelf: "center",
            fontSize: 25,
            color: "#214530",
          }}
        />
        <Text style={{ color: "#214530", fontWeight: "bold" }}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <FontAwesome5
          name="user"
          style={styles.iconStyle}
          color={route.name === "Profile" ? "#eecf65" : "#caddaa"}
        />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#214530",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: 5,
    paddingBottom: 5,
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 20,
    // color: "#fff",
  },
  text: {
    color: "#caddaa",
  },
});
