import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import app from "../../services/firebase";
import {
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
const Loginform = ({ onPress }) => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const { game, ROW_ARRAY } = useSelector((state) => state.reducer.game);
  const { colors } = useTheme();

  const signInWithFacebook = async () => {};

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value="ggg"
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Pressable
        onPress={() => onPress()}
        type="submit"
        style={[
          styles.submit_button,
          {
            backgroundColor: colors.primary,
            shadowColor: colors.border,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.submit_text, { color: colors.buttonText }]}>
          SUBMIT
        </Text>
      </Pressable>

      <View>
        <Button title="SIgn IN withFacebook" onPress={signInWithFacebook} />
      </View>
    </View>
  );
};

export default Loginform;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submit_button: {
    borderRadius: 40,

    padding: 1,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 2,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    height: 55,
    width: 150,
  },

  action_wrapper: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  submit_text: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});
