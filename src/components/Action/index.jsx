import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

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
  const { colors } = useTheme();
  return (
    <View style={styles.action_wrapper}>
      <Pressable
        disabled={colIndex < 5 ? true : false}
        onPress={() => onPress()}
        type="submit"
        style={[styles.submit_button, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.submit_text, { color: colors.buttonText }]}>
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
  submit_button: {
    borderRadius: 40,

    padding: 6,
    borderBottomWidth: 2,
    elevation: 7,
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 4,
    },
  },

  action_wrapper: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submit_text: {
    fontSize: 30,

    letterSpacing: 1,
  },
});
