import { React, useState } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import TitleText from "../../components/titleText";
import InputBox from "../../components/inputBox";
import SubmitButton from "../../components/submitButton";

const ResetPass = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      ></View>
      <TitleText title={"Reset Password"} />

      <View style={styles.inputBox}>
        <Text
          style={{
            marginBottom: 30,
            fontSize: 18,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Please enter your email address to request a password reset
        </Text>
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
      <SubmitButton btnTitle="Reset" buttonStyle={{ top: 230 }} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#31A05F",
    width: "100%",
  },
  inputBox: {
    top: "15%",
    width: "80%",
  },
});

export default ResetPass;
