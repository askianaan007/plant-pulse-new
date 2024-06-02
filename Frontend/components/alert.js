import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";

const MainPostCard = ({ posts, navigation }) => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      {posts?.map((post, i) => (
        <View key={i}>
          {post.waterLevel <= 30 && (
            <TouchableOpacity
              style={{
                backgroundColor:"#FFA900",
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
              onPress={() => navigation.navigate("Plants", { post: post })}
            >
              <Image source={require("../assets/Images/low.png")} />
              <View style={{ width: 200, paddingLeft: 10, alignItems: "center" }}>
                <Text style={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}>
                  {post?.title} is very thirsty! Please provide water promptly
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    color: "#BE0D0D",
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  Water level {post?.waterLevel}%
                </Text>
              </View>
              <Image source={require("../assets/Images/tree111.png")} />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};


export default MainPostCard;
