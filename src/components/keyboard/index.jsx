import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { keyboard } from "../../data";

const Keyboard = ({ handleKey, handleDelete }) => {
  return (
    <View style={styles.letter_wrapper}>
      {keyboard.map((item, i) => (
        <View key={i} style={styles.row}>
          {item.map((key, i) => (
            <Pressable
              key={i}
              onPress={() =>
                key === "DEL"
                  ? handleDelete()
                  : handleKey({ id: i, value: key, color: "" })
              }
              // style={styles.letter}
            >
              <Text style={styles.letter}> {key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  letter_wrapper: {
    /*     marginTop: 10,
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 10,
    flex: 1,
    backgroundColor: "blue",
    flexDirection: "column",
    height: 40, */
    padding: 10,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: "auto",
  },

  letter: {
    // backgroundColor: "red",
    /*     width: "20%",
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    width: 10,
    fontWeight: 900,
    fontSize: 10,
    margin: 2, */
    fontWeight: "bold",
    borderRadius: 6,
    margin: 2,
    fontSize: 26,
    alignSelf: "stretch",
    backgroundColor: "#514949",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    color: "white",
    elevation: 60,
    shadowColor: "black",
    shadowOffset: {
      width: 6,

      height: 6,
    },
  },
  row: {
    alignSelf: "stretch",
    margin: 4,
    justifyContent: "center",
    flexDirection: "row",
  },
});
