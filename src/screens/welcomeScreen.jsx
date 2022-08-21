import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./homeScreen";
const WelcomeScreen = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable onPress={() => navigate.navigate("Home")}>
          <Text style={styles.text}>New Game</Text>
        </Pressable>
        <Text style={styles.text}>Resume</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dd7b7b",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  wrapper: {},
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "900",
    backgroundColor: "orange",
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },
});
