import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setNextLvl } from "../../redux/gameSlice";
import { updateSuccessStatus } from "../../redux/userSlice";
import { getPercentage } from "../../helperFunctions";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { color } from "react-native-reanimated";

const SettingsModal = ({ toggle }) => {
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
      <View style={[styles.modalWrapper, { backgroundColor: colors.border }]}>
        <View
          style={[styles.title_wrapper, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.title_textStyle, { color: colors.text }]}>
            SETTINGS
          </Text>
          <Pressable
            style={[styles.close_text]}
            onPress={() => toggle((preve) => !preve)}
          >
            <Ionicons
              style={[{ color: colors.text, fontWeight: "bold", fontSize: 40 }]}
              name="close"
            />
          </Pressable>
        </View>

        <View style={[styles.bottom_action_wrapper, { color: colors.border }]}>
          <Pressable style={[styles.switch_wrapper]}>
            <Text style={[styles.switch_text, { color: colors.text }]}>
              Dark Mode
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? { color: colors.text } : "#f4f3f4"}
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
  modalWrapper: {
    position: "relative",
    flexDirection: "column",
    flex: 1,
    marginVertical: 100,
    width: "92%",
    shadowColor: "#000",
    borderRadius: 20,
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
    marginRight: 6,
  },
  switch_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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

  text_style: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  close_text: {
    fontSize: 35,
    color: "blue",
    fontWeight: "bold",

    position: "absolute",
    right: 10,
    top: 4,
  },
  title_wrapper: {
    borderBottomWidth: 2,
    padding: 10,
    borderColor: "#ddd",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
  result_answer_textStyle: {
    marginTop: 20,
    color: "grey",
    fontSize: 20,
    fontWeight: "900",
  },
  title_textStyle: {
    fontSize: 30,
    fontWeight: "900",
  },
});
