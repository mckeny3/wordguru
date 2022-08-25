import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setNextLvl } from "../../redux/gameSlice";
import { updateSuccessStatus } from "../../redux/userSlice";
import { getPercentage } from "../../helperFunctions";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";

const SettingsModal = () => {
  const { game, settings } = useSelector((state) => state.reducer.game);
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(setNextLvl());
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);

    dispatch(setDarkMode());
  };
  const { colors } = useTheme();
  return (
    <View style={styles.modelContainer}>
      <View style={styles.modelWrapper}>
        <Pressable onPress={() => handleNext()} style={[styles.button_close]}>
          <Ionicons style={styles.close_text} name="close" />
        </Pressable>
        <View style={styles.result_wrapper}>
          <Text style={[styles.result_textStyle]}>SETTINGS</Text>
        </View>

        <View style={styles.bottom_action_wrapper}>
          <Pressable style={[styles.switch_wrapper]}>
            <Text style={styles.switch_text}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SettingsModal;

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
  switch_text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  switch_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
  result_wrapper: {
    borderWidth: 2,
    margin: 10,
    marginTop: 50,
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
