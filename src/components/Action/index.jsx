import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getStringArray } from "../../helperFunctions";
import { word } from "../../data";
import Ionicons from "@expo/vector-icons/Ionicons";
import app from "../../services/firebase";
import StyledButton, { Wcoins } from "../buttons";
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
  const { user, PURCHASES } = useSelector((state) => state.reducer.user);
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
    if (PURCHASES.WCOINS < 200) {
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

    if (PURCHASES.WCOINS < 200) {
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
  const handleGiveALetter = () => {
    if (game.colIndex >= 5) return;
    if (PURCHASES.WCOINS < 100) {
      alert("You don't have enough Wcoins to continue");
      navigate.navigate("purchaseScreen");
      return;
    }

    const colIndexFoward = game.colIndex;
    let copy = [...ROW_ARRAY.map((row) => [...row])];
    const letter = game.RANDOM_WORD[game.colIndex];

    console.log(letter);
    (copy[game.rowIndex][game.colIndex] = {
      value: letter,
      color: "green",
    }),
      dispatch(useWcoins(100));

    dispatch(setColIndex(colIndexFoward + 1));
    //dispatch(setRowIndex(rowIndexReverse));
    dispatch(setArrayRow(copy));
  };

  return (
    <View style={styles.action_wrapper}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={[styles.forward_wrapper, { marginRight: 4 }]}>
          <StyledButton
            onPress={() => handleGiveALetter()}
            width={40}
            height={40}
            borderRightWidth={2}
            borderBottomWidth={2}
            //disabled={game.rowIndex === 0 ? true : false}
            bg="green"
            // bg={game.rowIndex === 0 ? "grey" : "green"}
            title={<Ionicons name="bulb-sharp" size={20} />}
          />
          <View style={styles.wcoins_wrapper}>
            <View style={styles.booster_price_wrapper}>
              <Text
                style={{
                  fontSize: 7,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                100
              </Text>
              <Wcoins
                textStyle={{ fontSize: 8, fontWeight: "normal" }}
                width={10}
                height={10}
                borderBottomWidth={1}
                borderRightWidth={1}
              />
            </View>
          </View>
        </View>
        <View style={styles.forward_wrapper}>
          <StyledButton
            onPress={() => handleRewind()}
            width={40}
            height={40}
            borderRightWidth={2}
            borderBottomWidth={2}
            disabled={game.rowIndex === 0 ? true : false}
            bg={game.rowIndex === 0 ? "grey" : "green"}
            title={<Ionicons name="arrow-undo-circle" size={20} />}
          />
          <View style={styles.wcoins_wrapper}>
            <View style={styles.booster_price_wrapper}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                200
              </Text>
              <Wcoins
                textStyle={{ fontSize: 8, fontWeight: "normal" }}
                width={10}
                height={10}
                borderBottomWidth={1}
                borderRightWidth={1}
              />
            </View>
          </View>
        </View>
      </View>
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
      <View style={styles.forward_wrapper}>
        <StyledButton
          onPress={() => handleForward()}
          width={40}
          height={40}
          borderRightWidth={2}
          borderBottomWidth={2}
          disabled={game.rowIndex === 0 ? true : false}
          bg={game.rowIndex === 0 ? "grey" : "green"}
          title={<Ionicons name="play-forward" size={20} />}
        />
        <View style={styles.wcoins_wrapper}>
          <View style={styles.booster_price_wrapper}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: "white",
              }}
            >
              200
            </Text>
            <Wcoins
              textStyle={{ fontSize: 8, fontWeight: "normal" }}
              width={10}
              height={10}
              borderBottomWidth={1}
              borderRightWidth={1}
            />
          </View>
        </View>
      </View>
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
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  submit_text: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  forward_wrapper: {
    position: "relative",
  },
  booster_price_wrapper: {
    flexDirection: "row",
    height: 12,
    borderWidth: 2,
    borderColor: "green",
    justifyContent: "space-between",
    width: 36,
    alignItems: "center",
    paddingHorizontal: 6,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    left: 4,
    backgroundColor: "#3ec312",
  },
});
