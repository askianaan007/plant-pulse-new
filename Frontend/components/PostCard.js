import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModal";

const PostCard = ({ posts, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  // const navigation = useNavigation();
  const handleDeletePropmt = (id) => {
    Alert.alert("Attention!", "Are You Sure Want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

  //delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/posts/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("AllPlants");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  return (
    <View>
      <EditModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        post={post}
      />
      {posts?.map((post, i) => (
        <View key={i}>
          <View
            style={{
              ...styles.sliderContent,
              backgroundColor: getBackgroundColor(post.waterLevel),
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Plants", { post: post })}
              style={{ alignItems: "center" }}
            >
              <Text style={styles.sliderMainText}>
                {getHealthStatus(post.waterLevel)}
              </Text>
              <Image
                source={require("../assets/Images/image2.png")}
                style={styles.sliderImage}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.slidersubText1}> {post?.title}</Text>
              <Text style={styles.slidersubText1}>
                Water level {post?.waterLevel}%
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingRight: 20,
              }}
            >
              <Text style={{ marginHorizontal: 30 }}>
                <FontAwesome5
                  name="trash"
                  color="red"
                  size={20}
                  onPress={() => handleDeletePropmt(post?._id)}
                />
              </Text>
              <Text style={{ textAlign: "right" }}>
                <FontAwesome5
                  name="pen"
                  color="darkblue"
                  size={20}
                  onPress={() => {
                    setPost(post), setModalVisible(true);
                  }}
                />
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const getBackgroundColor = (waterLevel) => {
  if (waterLevel <= 35) {
    return "#A03131";
  } else if (waterLevel <= 70) {
    return "#FFA900";
  } else {
    return "#31A05F";
  }
};

const getHealthStatus = (waterLevel) => {
  if (waterLevel <= 35) {
    return "Not Healthy";
  } else if (waterLevel <= 70) {
    return "Average";
  } else {
    return "Healthy";
  }
};
export default PostCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#31A05F",
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  container2: {
    backgroundColor: "#fff",
    // height: "100%",
    width: "100%",
    top: "15%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // alignItems: "center",
  },
  scroll: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  slider: {
    width: "100%",
    // height: "100%",
    padding: 30,
  },

  mainText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#31A05F",
    marginLeft: 20,
  },
  sliderContent: {
    height: 220,
    borderRadius: 8,
    backgroundColor: "#31A05F",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sliderMainText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 10,
    paddingLeft: 15,
  },
  sliderImage: {
    width: 100,
    height: 110,
    resizeMode: "contain",
  },

  slidersubText1: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
