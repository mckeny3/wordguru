import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Keyboard from "../components/keyboard";
import { word } from "../data";
import { useState } from "react";
import Actions from "../components/Action";

const HomeScreen = () => {
  const [fiveLetter, setFiveLetter] = useState("");
  const [result, setResult] = useState(false);
  const [rondomWord, setRondomWord] = useState("");
  const [key, setKey] = useState([]);
  const [key2, setKey2] = useState([]);
  const [line, setLine] = useState(1);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [arrayLen, setArrayLen] = useState(5);
  const [restartGame, setRestartGame] = useState(false);
  const [isGameStart, setIsgameStart] = useState(false);
  const [letter, setLetter] = useState({});
  const [row, setRow] = useState(new Array(4).fill(new Array(5).fill("")));

  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);
  const [attemts, setAttemts] = useState(4);
  const [gameState, setGameState] = useState({
    END: false,
    PLAYING: false,
    WON: false,
    LOST: false,
  });

  /////////////RESTART
  const restart = () => {
    setFiveLetter("");
    setArrayLen(5);
    setKey2([]);
    setIsgameStart(true);
    setRestartGame((prev) => !prev);
    return setKey([]);
  };

  useEffect(() => {
    let len = word.length;
    setIsgameStart(true);
    len = Math.random() * len;
    len = Math.floor(len);

    setRondomWord(word[len]);
  }, [restartGame]);

  ////entered key
  const handleKey = (item) => {
    console.log(colIndex);
    if (colIndex < 5 && rowIndex < attemts && !result) {
      console.log("the row", row);

      const copy = [...row.map((arr) => [...arr])];
      const updated = (copy[rowIndex][colIndex] = item);
      setColIndex((prev) => prev + 1);
      return setRow(copy);
    }
  };

  ///handleDelete
  const handleDelete = () => {
    console.log(key);
    if (key.length <= 0) return;
    //const pop = g.splice(g.length - 1, 1);
    let copy = [...key];
    copy.pop();
    setKey(copy);
  };

  /////////HANDLIE SUBMIT
  /////get rondomword index

  const getWordIndex = (word, value) => {
    return word.split("").indexOf(value);
  };
  const handleSubmit = () => {
    console.log("oressed");
    if (rowIndex > 3) return;

    /////reaveal color
    let copy = [...row.map((row, i) => [...row])];
    setRowIndex((prev) => prev + 1);
    setColIndex(0);
    copy[rowIndex].map((item, i) => {
      if (rondomWord.split("").indexOf(...item.value) == i) {
        return { ...(item.color = "green") };
      }

      if (rondomWord.includes(item.value)) {
        console.log("included");
        return { ...(item.color = "red") };
      } else {
        return { ...(item.color = "grey") };
      }
    });
    setRow(copy);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => submit()}>
        <Text> Sumit -{rondomWord}</Text>
      </Pressable>
      <View style={styles.game_wrapper}>
        <ScrollView>
          {row.map((rows, i) => (
            <View key={i} style={styles.game_row}>
              {rows.map((cell, i) => (
                <View
                  key={i}
                  style={[
                    styles.game_cell,
                    { backgroundColor: cell.color ? cell.color : "#61dafb" },
                  ]}
                >
                  <Text style={styles.cell_letter}>{cell.value} </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      <Keyboard
        setLetter={setLetter}
        handleKey={handleKey}
        g={key}
        setKey={setKey}
        handleDelete={handleDelete}
      />
      <Actions
        rowIndex={rowIndex}
        colIndex={colIndex}
        onPress={handleSubmit}
        row={row}
        arrayLen={arrayLen}
        isGameStart={isGameStart}
      />

      {/*  */}
    </View>
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
    backgroundColor: "black",

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
