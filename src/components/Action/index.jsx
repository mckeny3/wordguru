import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getStringArray } from "../../helperFunctions";
import { word } from "../../data";
import Ionicons from "@expo/vector-icons/Ionicons";
import app from "../../services/firebase";
import StyledButton from "../buttons";
import {
  endGame,
  setArrayRow,
  setColIndex,
  setRowIndex,
} from "../../redux/gameSlice";
import userSlice, {
  updateSuccessStatus,
  useWcoins,
} from "../../redux/userSlice";
const Actions = ({ onPress, colIndex }) => {
  const { game, ROW_ARRAY } = useSelector((state) => state.reducer.game);
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigate = useNavigation();
  const isWordCorrect = () => {
    if (colIndex < 5) {
      return colors.buttonDisable;
    } else {
      const guessedWord = getStringArray(ROW_ARRAY[game.rowIndex]);

      if (guessedWord.length === 5 && word.includes(guessedWord)) {
        return colors.primary;
      } else {
        return colors.danger;
      }
    }
  };

  //////////Rewind Action
  const handleRewind = () => {
    console.log("rewind");

    if (game.rowIndex <= 0) return;
    if (user.WCOINS < 200) {
      alert("You don't have enough Wcoins to continue");
      navigate.navigate("purchaseScreen");
      return;
    }
    const colIndexReverse = game.colIndex - 1;
    const rowIndexReverse = game.rowIndex - 1;
    let copy = [...ROW_ARRAY.map((row) => [...row])];

    (copy[game.rowIndex - 1] = [
      { value: "", color: "transparent" },
      { value: "", color: "transparent" },
      { value: "", color: "transparent" },
      { value: "", color: "transparent" },
      { value: "", color: "transparent" },
    ]),
      dispatch(useWcoins(200));

    dispatch(setColIndex(0));
    dispatch(setRowIndex(rowIndexReverse));
    dispatch(setArrayRow(copy));
  };

  //////////fastfoward Action
  const handleForward = () => {
    console.log("foward");

    if (game.rowIndex === 0) return;

    if (user.WCOINS < 200) {
      alert("You don't have enough Wcoins to continue");
      navigate.navigate("purchaseScreen");
      return;
    }

    const colIndexReverse = game.colIndex - 1;
    const rowIndexReverse = game.rowIndex - 1;
    let copy = [...ROW_ARRAY.map((row) => [...row])];

    (copy[game.rowIndex] = [
      { value: game.RANDOM_WORD[0], color: "green" },
      { value: game.RANDOM_WORD[1], color: "green" },
      { value: game.RANDOM_WORD[2], color: "green" },
      { value: game.RANDOM_WORD[3], color: "green" },
      { value: game.RANDOM_WORD[4], color: "green" },
    ]),
      // dispatch(setColIndex(0));
      // dispatch(setRowIndex(rowIndexReverse));
      dispatch(setArrayRow(copy));
    dispatch(useWcoins(200));
    setTimeout(() => {
      dispatch(updateSuccessStatus(ROW_ARRAY.length - game.rowIndex));

      dispatch(
        endGame({
          result: true,
          modal: true,
          colIndex: 0,
          rowIndex: 0,
        })
      );
    }, 1000);
  };

  return (
    <View style={styles.action_wrapper}>
      <StyledButton
        bg={game.rowIndex > 0 ? "green" : "grey"}
        disabled={game.rowIndex === 0 ? true : false}
        onPress={() => handleRewind()}
        width={50}
        title={<Ionicons name="play-back" size={20} />}
      />
      <Pressable
        disabled={
          colIndex < 5 || isWordCorrect() === colors.danger ? true : false
        }
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
          {isWordCorrect() === colors.danger ? "NO MATCH" : "SUBMIT"}
        </Text>
      </Pressable>
      <StyledButton
        onPress={() => handleForward()}
        width={50}
        disabled={game.rowIndex === 0 ? true : false}
        bg={game.rowIndex === 0 ? "grey" : "green"}
        title={<Ionicons name="play-forward" size={20} />}
      />
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

    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-between",
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
  },
  submit_text: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});
