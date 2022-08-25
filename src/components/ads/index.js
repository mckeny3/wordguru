import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BottomAds = () => {
  return (
    <View style={styles.Wrapper}>
      <Text style={styles.textStyle}>face book ads</Text>
    </View>
  );
};

export default BottomAds;

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "grey",
    alignContent: "center",
    alignItems: "center",
    height: 30,
  },
  textStyle: {
    color: "orange",
    textAlign: "center",
  },
});
