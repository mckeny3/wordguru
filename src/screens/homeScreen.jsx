import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  Platform,
  Modal,
} from "react-native";
import React, { useEffect } from "react";
import Keyboard from "../components/keyboard";
import { word } from "../data";
import { useState } from "react";
import Actions from "../components/Action";
import GameHeader from "../components/gameHeader";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import gameSlice, {
  endGame,
  setArrayRow,
  setBgColor,
  setColIndex,
  setKeysColor,
  setRandomWord,
  setRowIndex,
  updateColor,
} from "../redux/gameSlice";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { getStringArray } from "../helperFunctions";
import WonModel from "../components/wonModel";
import { updateLostStatus, updateSuccessStatus } from "../redux/userSlice";
import { useTheme } from "@react-navigation/native";
const HomeScreen = () => {
  const [fiveLetter, setFiveLetter] = useState("");
  const [result, setResult] = useState(false);
  const [key, setKey] = useState([]);
  const [arrayLen, setArrayLen] = useState(5);
  const [isGameStart, setIsgameStart] = useState(false);
  const [letter, setLetter] = useState();
  const { game, ROW_ARRAY } = useSelector((state) => state.reducer.game);
  const colIndex = game.colIndex;
  const rowIndex = game.rowIndex;
  const {} = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();
  const [keyValue, setKeyValue] = useState([]);

  useEffect(() => {
    let len = word.length;
    len = Math.random() * len;
    len = Math.floor(len);

    dispatch(setRandomWord(word[len]));
  }, [game.LEVEL]);

  ////entered key
  const handleKey = (item) => {
    if (colIndex < 5 && rowIndex < game.ATTEMPTS) {
      const copy = [...ROW_ARRAY.map((arr) => [...arr])];
      copy[rowIndex][colIndex] = item;
      dispatch(setColIndex(colIndex + 1));
      return dispatch(setArrayRow(copy));
    }
  };

  ///handleDelete
  const handleDelete = () => {
    if (colIndex <= 0) return;
    const colIndexReverse = colIndex - 1;
    //const pop = g.splice(g.length - 1, 1);
    let copy = [...ROW_ARRAY.map((row) => [...row])];

    copy[rowIndex][colIndexReverse] = "";
    dispatch(setColIndex(colIndexReverse));
    dispatch(setArrayRow(copy));
  };

  /////////HANDLIE SUBMIT

  const handleSubmit = () => {
    if (rowIndex > game.ATTEMPTS) return;
    dispatch(updateColor(game.ROW_ARRAY));
    dispatch(setKeysColor());
    const array = ROW_ARRAY[game.rowIndex].map((row, i) => {
      if (game.RANDOM_WORD[i] === row.value) {
        return { color: "green", key: row.value };
      }

      if (game.RANDOM_WORD.includes(row.value)) {
        return { color: "orange", key: row.value };
      }
      if (!game.RANDOM_WORD.includes(row.value)) {
        return { color: "grey", key: row.value };
      }
    });
    setKeyValue(array);

    if (getStringArray(ROW_ARRAY[game.rowIndex]) === game.RANDOM_WORD) {
      dispatch(
        endGame({
          result: true,
          modal: true,
          colIndex: 0,
          rowIndex: 0,
        })
      );
      dispatch(updateSuccessStatus());

      dispatch(setRowIndex(rowIndex + 1));
      dispatch(setColIndex(0));
      return;
    }

    if (
      game.rowIndex >= 5 &&
      getStringArray(ROW_ARRAY[game.rowIndex]) !== game.RANDOM_WORD
    ) {
      dispatch(
        endGame({
          result: false,
          modal: true,
          colIndex: 0,
          rowIndex: 0,
        })
      );
      dispatch(updateLostStatus());

      dispatch(setRowIndex(rowIndex + 1));
      dispatch(setColIndex(0));
      return;
    }

    dispatch(setRowIndex(rowIndex + 1));
    dispatch(setColIndex(0));
  };

  ////HANDLE RESTART
  const handleRestart = () => {};
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.container, {}]}>
      <ExpoStatusBar />
      <GameHeader />
      <View
        style={[
          styles.game_wrapper,
          animatedStyles,
          { backgroundColor: colors.background },
        ]}
      >
        <Modal transparent={true} visible={game.MODAL_OPEN}>
          <WonModel />
        </Modal>
        <ScrollView>
          {ROW_ARRAY.map((rows, rowkey) => (
            <View key={rowkey} style={styles.game_row}>
              {rows.map((cell, i) => (
                <View
                  key={i}
                  style={[
                    animatedStyles,
                    styles.game_cell,
                    {
                      backgroundColor: cell.color ? cell.color : colors.card,
                      borderColor:
                        colIndex === i && rowIndex === rowkey
                          ? "rgb(161, 162, 139)"
                          : colors.border,
                      borderWidth:
                        colIndex === i && rowIndex === rowkey ? 2 : 2,
                    },
                  ]}
                >
                  <Text style={[styles.cell_letter, { color: colors.text }]}>
                    {cell.value}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      <Keyboard
        keyValue={keyValue}
        handleSubmit={handleSubmit}
        setLetter={setLetter}
        handleKey={handleKey}
        g={key}
        setKey={setKey}
        handleDelete={handleDelete}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  game_row: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  game_cell: {
    borderRadius: 10,
    flex: 1,
    margin: 3,
    aspectRatio: 1,
    maxWidth: 50,
    borderWidth: 2,
  },
  cell_letter: {
    textAlign: "center",
    flex: 1,
    fontSize: 30,
    padding: 2,
    fontWeight: "bold",
  },
  game_wrapper: {
    alignSelf: "stretch",
  },

  word_selected: {
    color: "white",
    fontWeight: "900",
    fontSize: 32,
  },
});

/* 




*/
