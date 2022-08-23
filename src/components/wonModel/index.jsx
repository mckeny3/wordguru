import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setNextLvl } from "../../redux/gameSlice";

const WonModel = () => {
  const { game } = useSelector((state) => state.reducer.game);
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(setNextLvl());
  };

  return (
    <View style={styles.modelContainer}>
      <View style={styles.modelWrapper}>
        <Pressable onPress={() => handleNext()} style={[styles.button_close]}>
          <Ionicons style={styles.close_text} name="close" />
        </Pressable>
        <View>
          <Text>You won!</Text>
        </View>
        <View style={styles.game_stats}>
          <View style={styles.game_stats.played}>
            <Text style={styles.game_stats.played.num}> {user.PLAYED}</Text>

            <Text style={styles.game_stats.played.text}> played</Text>
          </View>
          <View style={styles.game_stats.played}>
            <Text style={styles.game_stats.played.num}> 0</Text>

            <Text style={styles.game_stats.played.text}> Win</Text>
          </View>
          <View style={styles.game_stats.played}>
            <Text style={styles.game_stats.played.num}> 0</Text>

            <Text style={styles.game_stats.played.text}>
              Current{`\n`}Streak
            </Text>
          </View>
          <View style={styles.game_stats.played}>
            <Text style={styles.game_stats.played.num}> 0</Text>

            <Text style={styles.game_stats.played.text}>Best{`\n`}Streak</Text>
          </View>
        </View>
        <View style={styles.bottom_action_wrapper}>
          <Pressable style={[styles.button, styles.button_next]}>
            <Text style={styles.action_next_text}>Retry</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNext()}
            style={[styles.button, styles.button_next]}
          >
            <Text style={styles.action_next_text}>Next</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.button_next]}>
            <Text style={styles.action_next_text}>Share</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default WonModel;

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modelWrapper: {
    position: "relative",
    flexDirection: "column",
    backgroundColor: "white",
    flex: 1,
    marginVertical: 100,
    width: "92%",
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.4,
    elevation: 50,

    shadowRadius: 4,
  },

  game_stats: {
    marginTop: 100,
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

      num: { fontWeight: "bold", color: "orange", fontSize: 20 },
    },
  },
  bottom_action_wrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
    borderWidth: 1,
    alignItems: "center",
    margin: 10,
    borderColor: "#ddd",
    padding: 5,
    borderRadius: 15,
    marginTop: 80,
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
});
