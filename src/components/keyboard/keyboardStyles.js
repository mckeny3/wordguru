import { Dimensions, StyleSheet } from "react-native";
import { keyboard } from "../../data";

const screenWidth = Dimensions.get("window").width;
export const keyWidth = (screenWidth - 10) / keyboard[0].length;
const keyHeight = keyWidth * 1.3;

export const styles = StyleSheet.create({
  keyboardWrapper: {},
  letter_wrapper: {
    maxWidth: 100,
    maxHeight: 100,

    /*     marginTop: 10,
      justifyContent: "center",
      alignSelf: "stretch",
      padding: 10,
      flex: 1,
      backgroundColor: "blue",
      flexDirection: "column",
      height: 40, */ /* 
      marginTop: "auto",
      alignSelf: "stretch", */
    margin: 2,
    width: keyWidth - 4,
    height: keyHeight,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    alignSelf: "stretch",
    justifyContent: "center",
    flexDirection: "row",
  },
});
