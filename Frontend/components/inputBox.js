import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const inputBox = ({
  inputTitle,
  keyboardType,
  autoComplete,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  return (
    <View>
      <Text style={{ marginBottom: 10, color: "white" }}>{inputTitle}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    backgroundColor: "#caddaa",
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 10,
    color: "#34492a",
  },
});
export default inputBox;
