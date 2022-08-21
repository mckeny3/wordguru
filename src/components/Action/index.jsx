import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Actions = ({
  arrayLen,
  isGameStart,
  row,
  onPress,
  rowIndex,
  colIndex,
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
      <Pressable onClick={() => restart()} type="submit">
        <Text style={styles.action_restart}>Restart </Text>
      </Pressable>
    </View>
  );
};

export default Actions;

const styles = StyleSheet.create({
  action_submit: {
    borderRadius: 40,
    fontWeight: "bolder",
    fontSize: 20,
    marginTop: 10,
    padding: 8,
    backgroundColor: "blue",
    color: "#fff",
    border: 0,
    margin: 6,
  },

  action_restart: {
    borderRadius: 40,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    padding: 8,
    backgroundColor: "#216c8f",
    color: "#fff",
    border: 0,
  },
  action_restart_disabled: {
    borderRadius: 40,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    padding: 8,
    backgroundColor: "#848484",
    color: "#fff",
    border: 0,
  },
  action_wrapper: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
});
