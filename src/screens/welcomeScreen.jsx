import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import HomeScreen from "./homeScreen";
import { useDispatch, useSelector } from "react-redux";
import { endGame, resetGame, setNewGame } from "../redux/gameSlice";
import CustomAlert from "../components/custumAlert";
import useAlert from "../components/custumAlert";
import CustumAlert from "../components/custumAlert";
import { useState } from "react";
import { resetUserStats } from "../redux/userSlice";
import { MyTheme } from "../theme";
import SettingsModal from "../components/settingsModal";

const WelcomeScreen = () => {
  const { game } = useSelector((state) => state.reducer.game);
  const [visible, setVisible] = useState(false);
  const [isSettingsModalOpen, toggleSettingsModal] = useState(false);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const handleNewGame = (value) => {
    if (!game.INIT) {
      dispatch(setNewGame(true));

      navigate.navigate("Home");

      return;
    }
    if (!value && game.INIT) {
      setVisible(true);
      return;
    }
    if (value) {
      dispatch(resetGame());
      dispatch(resetUserStats());

      dispatch(setNewGame(true));
      setVisible(false);
      navigate.navigate("Home");
      return;
    }
  };
  const alert = (
    <CustomAlert
      onCallBack={() => handleNewGame(true)}
      visible={visible}
      title={"Alert"}
      setVisible={setVisible}
      msg={`You will loose all your data. \n Do you wish to overwrite saved game? `}
    />
  );
  // const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Modal transparent={true} visible={isSettingsModalOpen}>
        <SettingsModal />
      </Modal>
      <View style={styles.wrapper}>
        <View style={styles.title_wrapper}>
          <Text style={[styles.title_text, { color: MyTheme.colors.primary }]}>
            WORD GUESS
          </Text>
        </View>
        {alert}
        <View style={styles.option_wrapper}>
          <Pressable style={styles.button} onPress={() => handleNewGame()}>
            <Text style={styles.text}>New Game</Text>
          </Pressable>

          {game.INIT && (
            <Pressable
              style={styles.button}
              onPress={() => navigate.navigate("Home")}
            >
              <Text style={styles.text}>Continue</Text>
            </Pressable>
          )}
          <Pressable
            style={styles.button}
            onPress={() => toggleSettingsModal((prev) => !prev)}
          >
            <Text style={styles.text}>SETTINGS</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  title_wrapper: {},
  title_text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "orange",
    borderRadius: 20,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "#ddd",
  },
  option_wrapper: {
    marginBottom: 300,
    fontFamily: "Ubuntu",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignSelf: "stretch",
    flexGrow: 1,
  },
  wrapper: {
    /* 
    width: 500,
    height: 200, */
    maxHeight: 1000,
    maxWidth: 700,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
    height: "80%",
    width: "80%",
    marginVertical: "10%",

    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "900",
    color: "white",
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 20,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "#f2c40d",
  },
});
