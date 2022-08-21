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
      console.log("not del", item);

      console.log("the row", row);

      const copy = [...row.map((arr) => [...arr])];
      const updated = (copy[rowIndex][colIndex] = item);
      setColIndex((prev) => prev + 1);
      return setRow(copy);
    }
  };

  ////////HANDLE sUBMIT
  const handleSubmit = () => {
    let len = key.length;
    console.log("handling submit");
    let string = "";
    for (let i = 0; i < len; i++) {
      string += key[i].value;
    }

    /////reaveal color
    const updatedColor = key.map((k, i) => {
      if (rondomWord.split("").indexOf(k.value) === i) {
        //console.table(k, i);

        // let updateColor = [...k, (color = "green")];
        if (key2.length === 6) {
          setIsgameStart(false);
        }
        return { ...k, color: "green" };
      } else if (
        rondomWord.split("").indexOf(k.value) !== i &&
        rondomWord.includes(k.value)
      ) {
        // console.log("included match", { k, i });
        return { ...k, color: "orange" };
      }
      // console.log("not include", k);
      return { ...k, color: "grey" };
    });
    setKey2((prev) => [...prev, updatedColor]);
    setKey([]);

    ///
    setFiveLetter(string);
    if (rondomWord === string) {
      console.log("match", rondomWord);
      return setResult(true);
    } else {
      setLine((prev) => prev + 1);

      //setArrayLen((prev) => prev + 5);
    }
    return;
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

  const submit = () => {
    if (rowIndex > 3) return;

    //console.log(row[0][2]);

    /////reaveal color
    let copy = [...row.map((row, i) => [...row])];
    setRowIndex((prev) => prev + 1);
    setColIndex(0);
    copy[rowIndex].map((item) => {
      if (rondomWord.includes(item.value)) {
        console.log("included");
        return { ...(item.color = "red") };
      } else {
        return { ...(item.color = "grey") };
      }
    });
    console.log(copy);
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
      <Actions bunny={key} arrayLen={arrayLen} isGameStart={isGameStart} />

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
