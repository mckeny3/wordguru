import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Actions = ({
  arrayLen,
  isGameStart,
  row,
  onPress,
  rowIndex,
  colIndex,
  handleRestart,
}) => {
  //console.warn({ arrayLen, isGameStart, bunny });
  const test = "red";
  return (
    <View style={styles.action_wrapper}>
      <Pressable
        disabled={colIndex < 5 ? true : false}
        onPress={() => onPress()}
        type="submit"
      >
        <Text
          style={
            colIndex < 5 ? styles.action_restart_disabled : styles.action_submit
          }
        >
          Submit
        </Text>
      </Pressable>
      {/*  <Pressable onPress={() => handleRestart()} type="submit">
        <Text style={styles.action_restart}>Restart </Text>
      </Pressable> */}
    </View>
  );
};

export default Actions;

const styles = StyleSheet.create({
  action_submit: {
    borderRadius: 40,
    fontWeight: "900",

    fontSize: 30,
    padding: 8,
    backgroundColor: "orange",
    color: "#fff",
    border: 1,
    elevation: 60,
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    letterSpacing: 3,
  },

  action_restart_disabled: {
    borderRadius: 40,
    fontWeight: "900",
    fontSize: 30,
    padding: 8,
    backgroundColor: "#848484",
    color: "#fff",
    border: 1,
    elevation: 60,
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 4,
    },
  },
  action_wrapper: {
    flexDirection: "row",
    marginVertical: 2,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
