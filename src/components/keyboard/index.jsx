import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
/* import { keyboard } from "../../data";
 */ import { styles } from "./keyboardStyles.js";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Actions from "../Action";
import { useState } from "react";

const Keyboard = ({ handleKey, handleDelete, handleSubmit, keyValue }) => {
  const { colors } = useTheme();
  const { keyboard, game, ROW_ARRAY, KEY_COLOR } = useSelector(
    (state) => state.reducer.game
  );

  const letterColor = () => {
    const res = ROW_ARRAY[game.rowIndex].map((row) => {
      return { ...row };
    });

    return res;
  };

  console.log(letterColor());

  const getKeyColor = (key) => {
    let res = keyValue.map((item) => {
      if (key === item.key) {
        return item.color;
      }
    });

    if (res.includes("green")) {
      return "green";
    }
    if (res.includes("orange")) {
      return "orange";
    }
    if (res.includes("grey")) {
      return "grey";
    }
    return colors.border;
  };
  console.log(keyboard);

  return (
    <View style={styles.keyboardWrapper}>
      <Actions
        rowIndex={game.rowIndex}
        colIndex={game.colIndex}
        onPress={handleSubmit}
      />

      {keyboard.map((item, i) => (
        <View key={i} style={styles.row}>
          {item.map((key, i) => (
            <Pressable
              style={[
                styles.letter_wrapper,
                {
                  backgroundColor: getKeyColor(key),
                },
              ]}
              key={i}
              onPress={() =>
                key === "DEL"
                  ? handleDelete()
                  : handleKey({ value: key, color: "" })
              }
              // style={styles.letter}
            >
              <Text style={[styles.letter, { color: key.color }]}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;
