import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import InputBox from "../../components/inputBox";
import { useState } from "react";
import SubmitButton from "../../components/submitButton";
import axios from "axios";
import TitleText from "../../components/titleText";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("please fill all the fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      alert(data && data.message);
      navigation.navigate("Login");
      console.log("register data==>", { name, email, password });
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100%",
          width: "100%",
          position: "absolute",
          alignItems: "center",
        }}
      >
        <TitleText title={"Register"} />
        <View style={styles.inputBox}>
          <InputBox inputTitle={"Name"} value={name} setValue={setName} />

          <InputBox
            inputTitle={"Email"}
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            setValue={setEmail}
          />

          <InputBox
            inputTitle={"Password"}
            secureTextEntry={true}
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />

          <Text
            style={{ color: "red", fontSize: 16 }}
            onPress={() => navigation.navigate("ResetPass")}
          ></Text>
        </View>
        <SubmitButton
          btnTitle="Register"
          loading={loading}
          handleSubmit={handleSubmit}
          buttonStyle={{ top: 150 }}
        />
        <Text
          style={{
            top: 25,
            color: "#FFFFFF",
            fontSize: 15,
            left: 100,
          }}
          onPress={() => navigation.navigate("ResetPass")}
        >
          Forgot password
        </Text>
        <View style={styles.loginSet}>
          <Text style={styles.subtext}>
            Already have an account?{" "}
            <Text
              style={{ color: "red" }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
          <View style={styles.signin}>
            <View style={styles.line}></View>
            <Text style={styles.subtext2}>Login in with</Text>
            <View style={styles.line}></View>
          </View>

          <View style={styles.social}>
            <TouchableOpacity style={styles.box}>
              <Image
                source={require("../../assets/Images/google.png")}
                style={styles.image}
                resizeMode="stretch"
              />
              <Text> Google </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <Image
                source={require("../../assets/Images/Facebook_Logo_2023.png")}
                style={styles.image2}
                resizeMode="stretch"
              />
              <Text> Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    resizeMode: "cover",
  },

  inputBox: {
    top: "15%",
    width: "80%",
  },

  social: {
    flexDirection: "row",
    gap: 30,
    alignContent: "center",
    justifyContent: "center",
  },

  box: {
    width: 140,
    backgroundColor: "#FFFFFF",
    height: 54,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  image: {
    height: 45,
    width: 45,
    marginLeft: 10,
  },
  image2: {
    height: 40,
    width: 40,
    marginLeft: 10,
  },
  signin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  subtext: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
  },

  subtext2: {
    fontSize: 16,
    color: "#FFFFFF",
    marginHorizontal: "5%",
  },

  line: {
    height: 1,
    width: 84,
    backgroundColor: "#FFFFFF",
  },
  loginSet: {
    top: "20%",
    alignItems: "center",
  },
});

export default Register;
