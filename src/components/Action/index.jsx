import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getStringArray } from "../../helperFunctions";
import { word } from "../../data";
import Ionicons from "@expo/vector-icons/Ionicons";
import app from "../../services/firebase";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
const Actions = ({
  arrayLen,
  isGameStart,
  row,
  onPress,
  rowIndex,
  colIndex,
  handleRestart,
}) => {
  const { game, ROW_ARRAY } = useSelector((state) => state.reducer.game);
  const { colors } = useTheme();

  const isWordCorrect = () => {
    if (colIndex < 5) {
      return colors.buttonDisable;
    } else {
      const guessedWord = getStringArray(ROW_ARRAY[game.rowIndex]);

      if (guessedWord.length === 5 && word.includes(guessedWord)) {
        return colors.primary;
      } else {
        return "red";
      }
    }
  };
  return (
    <View style={styles.action_wrapper}>
      <Pressable
        disabled={colIndex < 5 ? true : false}
        onPress={() => onPress()}
        type="submit"
        style={[
          styles.submit_button,
          {
            backgroundColor: isWordCorrect(),
            shadowColor: colors.border,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.submit_text, { color: colors.buttonText }]}>
          {isWordCorrect() === "red" ? "NO MATCH" : "SUBMIT"}
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

    padding: 1,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 2,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    height: 55,
    width: 150,
  },

  action_wrapper: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  submit_text: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});
