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
  setArrayRow,
  setBgColor,
  setColIndex,
  setRowIndex,
  updateGame,
  updateSuccessStats,
  updateWordLength,
} from "../redux/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import { getStringArray } from "../helperFunctions";
import WonModel from "../components/wonModel";
const HomeScreen = () => {
  const [fiveLetter, setFiveLetter] = useState("");
  const [result, setResult] = useState(false);
  const [rondomWord, setRondomWord] = useState("");
  const [key, setKey] = useState([]);
  const [arrayLen, setArrayLen] = useState(5);
  const [restartGame, setRestartGame] = useState(false);
  const [isGameStart, setIsgameStart] = useState(false);
  const [letter, setLetter] = useState();
  const { game } = useSelector((state) => state.reducer.game);
  const colIndex = game.colIndex;
  const rowIndex = game.rowIndex;
  const [gam, setGam] = useState({
    ROW_ARRAY: new Array(6).fill(new Array(5).fill("")),
  });
  const {} = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let len = word.length;
    setIsgameStart(true);
    len = Math.random() * len;
    len = Math.floor(len);

    setRondomWord(word[len]);
  }, [restartGame]);

  ////entered key
  const handleKey = (item) => {
    if (colIndex < 5 && rowIndex < game.ATTEMPTS) {
      const copy = [...gam.ROW_ARRAY.map((arr) => [...arr])];
      copy[rowIndex][colIndex] = item;
      dispatch(setColIndex(colIndex + 1));
      return setGam({ ROW_ARRAY: copy });
    }
  };

  ///handleDelete
  const handleDelete = () => {
    if (colIndex <= 0) return;
    const colIndexReverse = colIndex - 1;
    //const pop = g.splice(g.length - 1, 1);
    let copy = [...gam.ROW_ARRAY.map((row) => [...row])];

    copy[rowIndex][colIndexReverse] = "";
    dispatch(setColIndex(colIndexReverse));
    console.log({ colIndexReverse });
    return setGam({ ROW_ARRAY: copy });
  };

  /////////HANDLIE SUBMIT

  const handleSubmit = () => {
    if (rowIndex > 3) return;

    /////reaveal color
    let copy = [...gam.ROW_ARRAY.map((row, i) => [...row])];
    dispatch(setRowIndex(rowIndex + 1));
    dispatch(setColIndex(0));
    copy[rowIndex].map((item, i) => {
      if (rondomWord[i] === item.value) {
        if (getStringArray(gam.ROW_ARRAY[rowIndex]) === rondomWord) {
          console.log("correct");
          dispatch(updateSuccessStats());
        }
        return { ...(item.color = "green") };
      }

      if (rondomWord.includes(item.value)) {
        console.log("included");
        return { ...(item.color = "orange") };
      }
      return { ...(item.color = "grey") };
    });
    console.log(copy);
    return dispatch(setArrayRow(copy));
  };

  ////HANDLE RESTART
  const handleRestart = () => {};

  const { test } = useSelector((state) => state.reducer.game);
  console.log(game);
  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar />
      <GameHeader />
      <View style={styles.game_wrapper}>
        <Modal transparent={true} visible={game.MODAL_OPEN}>
          <WonModel />
        </Modal>
        <ScrollView>
          {gam.ROW_ARRAY.map((rows, rowkey) => (
            <View key={rowkey} style={styles.game_row}>
              {rows.map((cell, i) => (
                <View
                  key={i}
                  style={[
                    styles.game_cell,
                    {
                      backgroundColor: cell.color ? cell.color : "#61dafb",
                      borderColor:
                        colIndex === i && rowIndex === rowkey ? "red" : "",
                    },
                  ]}
                >
                  <Text style={styles.cell_letter}>{cell.value} </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      <Actions
        rowIndex={rowIndex}
        colIndex={colIndex}
        onPress={handleSubmit}
        row={gam.ROW_ARRAY}
        arrayLen={arrayLen}
        isGameStart={isGameStart}
        handleRestart={handleRestart}
      />

      <Keyboard
        setLetter={setLetter}
        handleKey={handleKey}
        g={key}
        setKey={setKey}
        handleDelete={handleDelete}
      />
      {/*  */}
      <Pressable
        onPress={() =>
          Platform.OS === "windows"
            ? Alert.alert("Word Guru", rondomWord)
            : alert(rondomWord)
        }
      >
        <Text>Give up!!!!{rondomWord}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    //backgroundColor: "indigo",
    flex: 1,
  },
  game_row: {
    flexDirection: "row",
    margin: 3,
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
    color: "#fff",
  },
  game_wrapper: {
    backgroundColor: "#ffffff",

    flex: 1,
    alignSelf: "stretch",
  },

  word_selected: {
    backgroundColor: "#61dafb",
    color: "white",
    height: 32,
    width: 32,
    /*   color: white;
  background-color: #61dafb;
  border-radius: 0.50rem;

  height: 2.4rem;
  width: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;*/
    fontWeight: "900",
    fontSize: 20,
  },
});

/* 




*/
