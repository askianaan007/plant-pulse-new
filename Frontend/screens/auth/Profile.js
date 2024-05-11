import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import FooterMenu from "../../components/menus/FooterMenu";
import { AuthContext } from "../../context/authContext";
import SubmitButton from "../../components/submitButton";
import axios from "axios";




const Profile = () => {
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [loading, setLoading] = useState(false);

  //handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/login back2.jpg")}
      style={styles.backgroundImage}
    >
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          height: "100%",
          width: "100%",
          position: "absolute",
          alignItems: "center",
        }}
      ></View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Image
            source={require("../../assets/user.jpg")}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
          <Text style={styles.warningtext}>
            Currently the user only change the password and username
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.texts}>NAME</Text>
          <TextInput
            value={name}
            style={styles.inputBox}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <Text style={styles.texts}>EMAIL</Text>
          <TextInput value={email} style={styles.inputBox2} editable={false} />
          <Text style={styles.texts}>PASSWORD</Text>
          <TextInput
            value={password ? password.toString() : ""}
            style={styles.inputBox}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />
          <Text style={styles.texts}>ROLE</Text>
          <TextInput
            value={state?.user.role}
            style={styles.inputBox2}
            editable={false}
          />
        </View>
        <SubmitButton
          btnTitle="Update"
          loading={loading}
          handleSubmit={handleUpdate}
          // handleSubmit={handleSubmit}
          buttonStyle={{ top: 20 }}
        />
      </ScrollView>
      <FooterMenu />
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
  },
  scroll: {
    alignItems: "center",
  },
  texts: {
    color: "#caddaa",
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 10,
  },
  warningtext: {
    color: "#eecf65",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    textTransform: "uppercase",
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: "#caddaa",
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    color: "black",
    fontSize: 15,
  },
  inputBox2: {
    width: 300,
    height: 40,
    backgroundColor: "#caddaa",
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    color: "gray",
    fontSize: 15,
  },
  inputContainer: {
    // justifyContent: "center",
    marginTop: 20,
  },
});
