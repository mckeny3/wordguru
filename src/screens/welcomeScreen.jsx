import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, setNewGame } from "../redux/gameSlice";
import CustomAlert from "../components/custumAlert";
import { useState } from "react";
import userSlice, { resetUserStats } from "../redux/userSlice";
import SettingsModal from "../components/settingsModal";
import { getPercentage } from "../helperFunctions";
import Loginform from "../components/login";
import * as Device from "expo-device";
const WelcomeScreen = () => {
  const { game, settings } = useSelector((state) => state.reducer.game);
  const { user } = useSelector((state) => state.reducer.user);
  const [visible, setVisible] = useState(false);
  const [isSettingsModalOpen, toggleSettingsModal] = useState(false);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { color } = useTheme();

  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
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
  /*   // const { colors } = useTheme();
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black900.otf"),
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  } */
  const title = ["W", "O", "R", "D", "L", "L", "E"];
  ////////////grab user data from firebase

  return (
    <SafeAreaView
      style={[
        styles().container,
        {
          backgroundColor:
            settings.DARK_MODE === true ? colors.background : colors.primary,
        },
      ]}
    >
      <Modal transparent={true} visible={isSettingsModalOpen}>
        <SettingsModal toggle={toggleSettingsModal} />
      </Modal>
      <View
        style={[
          styles().wrapper,
          { backgroundColor: colors.card, shadowColor: "black" },
        ]}
      >
        <View style={styles().title_wrapper}>
          {title.map((letter, i) => (
            <View
              key={i}
              style={{
                shadowOpacity: 0.9,
                shadowOffset: { width: 4, height: 6 },
                shadowRadius: 10,
                elevation: 3,
                shadowColor: "black",
                backgroundColor:
                  (letter === "W" && "orange") ||
                  (letter === "E" && "orange") ||
                  (letter === "O" && colors.primary) ||
                  (letter === "R" && colors.notification) ||
                  (letter === "L" && "green") ||
                  (letter === "D" && "grey"),

                borderRadius: 3,
                padding: 4,
                margin: 4,
                borderColor: "#ccc",
                borderBottomWidth: 4,
                borderRightWidth: 4,
              }}
            >
              <Text style={[styles().title_text, { color: "white" }]}>
                {letter}
              </Text>
            </View>
          ))}
        </View>
        {alert}

        {user ? (
          <>
            <View style={styles().option_wrapper}>
              <Pressable
                style={[styles().button, { backgroundColor: colors.primary }]}
                onPress={() => handleNewGame()}
              >
                <Text style={styles().text}>New Game</Text>
              </Pressable>

              {game.INIT && (
                <Pressable
                  style={[styles().button, { backgroundColor: colors.primary }]}
                  onPress={() => navigate.navigate("Home")}
                >
                  <Text style={[styles().text]}>Continue</Text>
                </Pressable>
              )}
              <Pressable
                style={[styles().button, { backgroundColor: colors.primary }]}
                onPress={() => toggleSettingsModal((prev) => !prev)}
              >
                <Text style={styles().text}>SETTINGS</Text>
              </Pressable>
            </View>
            <View
              style={[
                styles().game_stats,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                },
              ]}
            >
              <View style={[styles().game_stats.played]}>
                <Text style={[styles(colors.primary).game_stats.played.num]}>
                  {user.PLAYED}
                </Text>

                <Text style={[styles("", colors.soft).game_stats.played.text]}>
                  played
                </Text>
              </View>
              <View style={[styles().game_stats.played]}>
                <Text style={[styles(colors.primary).game_stats.played.num]}>
                  {getPercentage(user.WON, user.PLAYED)}%
                </Text>

                <Text style={[styles().game_stats.played.text]}>Win</Text>
              </View>
              <View style={[styles().game_stats.played]}>
                <Text style={[styles(colors.primary).game_stats.played.num]}>
                  {user.STREAK}
                </Text>

                <Text style={[styles().game_stats.played.text]}>
                  Current{`\n`}Streak
                </Text>
              </View>
              <View
                style={[styles().game_stats.played, { color: colors.primary }]}
              >
                <Text style={[styles(colors.primary).game_stats.played.num]}>
                  {user.MAX_STREAK}
                </Text>

                <Text style={[styles(colors.textSoft).game_stats.played.text]}>
                  Best{`\n`}Streak
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View>
            <Loginform />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = (colors, textColor) =>
  StyleSheet.create({
    title_wrapper: { flexDirection: "row" },
    title_text: {
      fontSize: 33,
      fontWeight: "bold",
      textShadowColor: "black",
      shadowOpacity: 0.26,
      textShadowOffset: { width: 2, height: 2 },
      shadowRadius: 10,
      backgroundColor: "transparent",
    },
    option_wrapper: { marginTop: 20 },

    container: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      alignSelf: "stretch",
      flexGrow: 1,
    },
    wrapper: {
      maxWidth: 500,
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 10,
      width: "95%",
      marginVertical: "10%",
      justifyContent: "center",
      borderRadius: 20,
      shadowOpacity: 0.5,
      shadowColor: "black",
      shadowOffset: { width: 6, height: 6 },
      shadowRadius: 10,
      elevation: 3,
    },
    text: {
      textAlign: "center",
      fontSize: 20,
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
    },
    game_stats: {
      marginTop: 100,
      width: "100%",
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 6,
      borderRadius: 15,
      played: {
        marginRight: 10,

        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        text: {
          color: textColor,
          fontWeight: "bold",
        },

        num: { fontWeight: "bold", fontSize: 15, color: colors },
      },
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
