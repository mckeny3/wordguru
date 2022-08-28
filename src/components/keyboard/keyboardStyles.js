import { Dimensions, StyleSheet } from "react-native";
import { keyboard } from "../../data";

const screenWidth = Dimensions.get("window").width;
export const keyWidth = (screenWidth - 10) / keyboard[0].length;
const keyHeight = keyWidth * 1.3;

export const styles = (del) =>
  StyleSheet.create({
    keyboardWrapper: {},
    letter_wrapper: {
      maxWidth: 70,
      maxHeight: 70,

      margin: 2,
      width: keyWidth - 4,
      height: keyHeight,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
    },

    letter: {
      fontSize: 24,
      fontWeight: "bold",
    },
    row: {
      alignSelf: "stretch",
      justifyContent: "center",
      flexDirection: "row",
    },
  });
