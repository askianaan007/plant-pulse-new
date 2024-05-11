import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);
  const handleLogout = async () => {
    setState({ token: "", user: null }), await AsyncStorage.removeItem("@auth");
    alert("Logged out succesfully");
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;
const styles = StyleSheet.create({
  iconStyle: {
    // marginBottom: 1,
    alignSelf: "center",
    fontSize: 25,
    color: "#FFF",
  },
});
