import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleText from "../../components/titleText";
import InputBox from "../../components/inputBox";
import SubmitButton from "../../components/submitButton";
import { AuthContext } from "../../context/authContext";

const Login = ({ navigation }) => {
  // global state
  const [state, setState] = useContext(AuthContext);

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all the fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/login", { email, password });
      setState({ user: data.user, token: data.token });
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
      console.log("login data ==> ", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // temp function to check local storage
  useEffect(() => {
    const getLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      console.log("local storage ==> ", data);
    };
    getLocalStorageData();
  }, []);

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
        <TitleText title={"Login"} />
        <View style={styles.inputBox}>
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
        </View>
        <SubmitButton
          btnTitle="login"
          loading={loading}
          handleSubmit={handleSubmit}
          buttonStyle={{ top: 200 }}
        />
        <Text
          style={{
            top: 50,
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
            Don't have an account?{" "}
            <Text
              style={{ color: "red" }}
              onPress={() => navigation.navigate("Register")}
            >
              Signup
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
    // or 'stretch' or 'contain'
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
    top: "35%",
    alignItems: "center",
  },
});

export default Login;
