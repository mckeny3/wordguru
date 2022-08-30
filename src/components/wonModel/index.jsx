import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setNextLvl } from "../../redux/gameSlice";
import { updateSuccessStatus } from "../../redux/userSlice";
import { getPercentage } from "../../helperFunctions";
import StyledButton from "../buttons";
import { useTheme } from "@react-navigation/native";

const WonModel = () => {
  const { game, ROW_ARRAY } = useSelector((state) => state.reducer.game);
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(setNextLvl());
  };
  const { colors } = useTheme();
  return (
    <View style={styles().modelContainer}>
      <View style={styles().modelWrapper}>
        <View style={styles().result_wrapper}>
          {game.WON ? (
            <Text style={styles().result_textStyle}>Congratulation!</Text>
          ) : (
            <Text
              style={[
                styles().result_textStyle,
                { color: game.WON ? colors.primary : colors.danger },
              ]}
            >
              You're out of guesses!
            </Text>
          )}
          <Text style={styles().result_answer_textStyle}>
            The answer is {game.RANDOM_WORD}!
          </Text>
        </View>
        {game.WON && ( // if the game is won
          <View style={styles().result_wrapper}>
            <Text style={styles(colors.textSoft).gain_textStyle}>
              Wcoins <Text style={styles().gain_num_style}>+10</Text>
            </Text>
            <Text style={styles(colors.textSoft).gain_textStyle}>
              Points{" "}
              <Text style={styles(colors.textSoft).gain_num_style}>
                +{user.POINTS_GAINED}
              </Text>
            </Text>
          </View>
        )}
        <View style={styles().game_stats}>
          <View style={styles().game_stats.played}>
            <Text style={styles(colors.primary).game_stats.played.num}>
              {user.PLAYED}
            </Text>

            <Text style={styles().game_stats.played.text}> played</Text>
          </View>
          <View style={styles().game_stats.played}>
            <Text style={styles(colors.primary).game_stats.played.num}>
              {getPercentage(user.WON, user.PLAYED)}%
            </Text>

            <Text style={styles().game_stats.played.text}> Win</Text>
          </View>
          <View style={styles().game_stats.played}>
            <Text style={styles(colors.primary).game_stats.played.num}>
              {user.STREAK}
            </Text>

            <Text style={styles().game_stats.played.text}>
              Current{`\n`}Streak
            </Text>
          </View>
          <View style={styles().game_stats.played}>
            <Text style={styles(colors.primary).game_stats.played.num}>
              {user.MAX_STREAK}
            </Text>

            <Text style={styles().game_stats.played.text}>
              Best{`\n`}Streak
            </Text>
          </View>
        </View>
        <View style={styles().bottom_action_wrapper}>
          <StyledButton width={140} onPress={() => handleNext()} title="NEXT" />
        </View>
      </View>
    </View>
  );
};

export default WonModel;

const styles = (colors) =>
  StyleSheet.create({
    gain_num_style: {
      color: "green",
      fontWeight: "bold",
      fontSize: 30,
      margin: 10,
    },
    gain_textStyle: {
      color: colors,
      fontSize: 20,
      fontWeight: "bold",
      margin: 10,
    },
    modelContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modelWrapper: {
      justifyContent: "space-between",
      position: "relative",
      flexDirection: "column",
      backgroundColor: "white",
      flex: 1,
      marginVertical: 100,
      width: "92%",
      shadowColor: "#000",
      borderRadius: 10,
      shadowOffset: {
        width: 8,
        height: 8,
      },
      shadowOpacity: 0.4,
      elevation: 50,

      shadowRadius: 4,
    },

    game_stats: {
      //marginTop: 100,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      borderColor: "#ddd",
      alignItems: "center",
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 15,
      played: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flex: 1,
        text: {
          fontWeight: "bold",
        },

        num: { fontWeight: "bold", color: colors, fontSize: 20 },
      },
    },
    bottom_action_wrapper: {
      justifyContent: "center",
      flexDirection: "row",
      alignSelf: "stretch",
      borderWidth: 1,
      alignItems: "center",
      margin: 10,
      borderColor: "#ddd",
      padding: 5,
      borderRadius: 15,
      //marginTop: 80,
    },
    button: {
      borderRadius: 50,
      padding: 8,
      elevation: 2,
    },
    button_next: {
      backgroundColor: "orange",
    },

    action_next_text: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    text_style: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    button_close: {
      position: "absolute",
      right: 10,
      top: 4,
      backgroundColor: "orange",
      borderRadius: 30,
      padding: 2,
    },
    close_text: {
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
    },
    result_wrapper: {
      borderWidth: 2,
      margin: 10,
      // marginTop: 50,
      borderRadius: 30,
      padding: 20,
      borderColor: "#ddd",
      justifyContent: "center",
      alignItems: "center",
    },
    result_answer_textStyle: {
      marginTop: 20,
      color: "grey",
      fontSize: 20,
      fontWeight: "900",
    },
    result_textStyle: {
      fontSize: 30,
      fontWeight: "900",
    },
  });
