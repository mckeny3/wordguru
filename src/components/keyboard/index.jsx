import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
/* import { keyboard } from "../../data";
 */ import { keyWidth, styles } from "./keyboardStyles.js";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Actions from "../Action";
import { useState } from "react";

const Keyboard = ({ handleKey, handleDelete, handleSubmit, keyValue }) => {
  const { colors } = useTheme();
  const { keyboard, game, ROW_ARRAY, KEY_COLOR } = useSelector(
    (state) => state.reducer.game
  );

  return (
    <View style={styles().keyboardWrapper}>
      <Actions
        rowIndex={game.rowIndex}
        colIndex={game.colIndex}
        onPress={handleSubmit}
      />

      {keyboard.map((item, i) => (
        <View key={i} style={styles().row}>
          {item.map((key, i) => (
            <Pressable
              style={[
                styles().letter_wrapper,
                {
                  backgroundColor:
                    key.k_color === "transparent"
                      ? colors.card
                      : key.k_color === "grey"
                      ? colors.danger
                      : key.k_color,
                  borderBottomWidth: 4,
                  borderColor: colors.border,
                  borderWidth: 1,
                },
                key.value === "DEL" && {
                  width: keyWidth * 1.6,
                },
              ]}
              key={i}
              onPress={() =>
                key.value === "DEL" ? handleDelete() : handleKey(key)
              }
              // style={styles.letter}
            >
              <Text
                style={[styles({ del: 100 }).letter, { color: colors.text }]}
              >
                {key.value}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;
