import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import Keyboard from "../components/keyboard";
import { word } from "../data";
import { useState } from "react";
import GameHeader from "../components/gameHeader";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import {
  endGame,
  setArrayRow,
  setColIndex,
  setDarkMode,
  setRandomColor,
  setRandomWord,
  setRowIndex,
  updateColor,
} from "../redux/gameSlice";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { getStringArray } from "../helperFunctions";
import WonModel from "../components/wonModel";
import { updateLostStatus, updateSuccessStatus } from "../redux/userSlice";
import { useTheme } from "@react-navigation/native";
import StyledButton from "../components/buttons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AwesomeAlert from "react-native-awesome-alerts";
import CustomAlert from "../components/custumAlert";

const HomeScreen = () => {
  const [fiveLetter, setFiveLetter] = useState("");
  const [result, setResult] = useState(false);
  const [key, setKey] = useState([]);
  const [arrayLen, setArrayLen] = useState(5);
  const [isGameStart, setIsgameStart] = useState(false);
  const [letter, setLetter] = useState();
  const { game, ROW_ARRAY, settings } = useSelector(
    (state) => state.reducer.game
  );
  const colIndex = game.colIndex;
  const rowIndex = game.rowIndex;
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();
  const [keyValue, setKeyValue] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    let len = word.length;
    len = Math.random() * len;
    len = Math.floor(len);

    dispatch(setRandomWord(word[len]));
  }, []);

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

    copy[rowIndex][colIndexReverse] = { value: "", color: "transparent" };
    dispatch(setColIndex(colIndexReverse));
    dispatch(setArrayRow(copy));
  };

  /////////HANDLIE SUBMIT

  const handleSubmit = () => {
    if (rowIndex > game.ATTEMPTS) return;
    dispatch(updateColor(game.ROW_ARRAY));

    if (getStringArray(ROW_ARRAY[game.rowIndex]) === game.RANDOM_WORD) {
      dispatch(updateSuccessStatus(ROW_ARRAY.length - game.rowIndex));

      dispatch(
        endGame({
          result: true,
          modal: true,
          colIndex: 0,
          rowIndex: 0,
        })
      );
      /* 
      dispatch(setRowIndex(rowIndex + 1));
      dispatch(setColIndex(0)); */
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
      /* 
      dispatch(setRowIndex(rowIndex + 1));
      dispatch(setColIndex(0)); */
      return;
    }

    dispatch(setRowIndex(rowIndex + 1));
    dispatch(setColIndex(0));
  };

  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });
  const { colors } = useTheme();

  /*  useEffect(() => {
    const getRandomColor = () => {
      var letters = "0123456789ABCDEF";
      var colorz = "#";
      for (var i = 0; i < 6; i++) {
        colorz += letters[Math.floor(Math.random() * 16)];
      }
      return dispatch(setRandomColor(colorz));
    };
    getRandomColor();
  }, []); */
  const handleRandomColor = () => {
    console.log("random color");
    const getRandomColor = () => {
      var letters = "0123456789ABCDEF";
      var colorz = "#";
      for (var i = 0; i < 6; i++) {
        colorz += letters[Math.floor(Math.random() * 16)];
      }
      return dispatch(setRandomColor(colorz));
    };
    getRandomColor();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            settings.DARK_MODE === true
              ? colors.background
              : settings.RANDOM_COLOR,
        },
      ]}
    >
      <ExpoStatusBar style="light" />
      <CustomAlert
        title="ALERT"
        msg="you can only change theme in light mode, Do you want to switch?"
        visible={showAlert}
        setVisible={setShowAlert}
        onCallBack={() => {
          dispatch(setDarkMode());
          setShowAlert(false);
        }}
      />
      <GameHeader />
      <Pressable
        onPress={
          settings.DARK_MODE === true
            ? () => setShowAlert((prev) => !prev)
            : () => handleRandomColor()
        }
        style={styles.color_changer}
      >
        <Ionicons name="color-palette" size={30} color={colors.primary} />
      </Pressable>
      <View style={[[styles.game_wrapper, {}], {}]}>
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
                    styles.game_cell,
                    {
                      backgroundColor: cell.color,
                      /* 
                        colIndex === i && rowIndex === rowkey
                          ? "rgb(161, 162, 139)" */
                      borderColor:
                        cell.color !== "transparent"
                          ? cell.color
                          : colors.border,
                      borderWidth:
                        colIndex === i && rowIndex === rowkey ? 4 : 3,
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
      {/*       <Text>{game.RANDOM_WORD}</Text>
       */}
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
  color_changer: {
    alignSelf: "flex-end",
    marginBottom: 10,
    top: 100,
    position: "absolute",
    backgroundColor: "grey",
    opacity: 0.5,
    height: 30,
    padding: 1,
    overflow: "hidden",
    borderW2idth: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 30,
  },
});

/* 




*/
