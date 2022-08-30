import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
const CustomAlert = ({ title, msg, setVisible, visible, onCallBack }) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Pressable
            onPress={() => setVisible(false)}
            style={styles.close_button}
          >
            <Text style={styles.close_text}>X</Text>
          </Pressable>
          <View style={styles.title_wrapper}>
            <Text style={styles.title_style}>{title}</Text>
          </View>
          <View style={styles.message_wrapper}>
            <Text style={styles.message_style}>{msg}</Text>
          </View>
          <View style={styles.action_wrapper}>
            <Pressable
              onPress={() => setVisible(false)}
              style={[
                styles.cancel_button_style,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={[styles.action_text_style, { color: colors.danger }]}
              >
                CANCEL
              </Text>
            </Pressable>
            <Pressable
              onPress={() => onCallBack()}
              style={[
                styles.confirm_button_style,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={[styles.action_text_style, { color: colors.text }]}>
                CONFIRM
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    /* 
    width: 500,
    height: 200, */
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
    height: "50%",
    width: "50%",
    marginVertical: "10%",

    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  close_button: {
    position: "absolute",
    backgroundColor: "#ddd",
    padding: 4,
    borderRadius: 100,
    right: 10,
    top: 10,
  },
  close_text: { color: "white", fontWeight: "bold" },

  action_wrapper: {
    flexDirection: "row",
    borderWidth: 2,
    padding: 6,
    borderRadius: 50,
    borderColor: "#ddd",
  },
  cancel_button_style: {
    backgroundColor: "orange",
    padding: 4,
    borderRadius: 20,
    shadowOffset: { width: 2, height: 2 },
    elevation: 1,
    shadowOpacity: 0.25,
    shadowColor: "black",
  },
  action_text_style: { fontSize: 15, fontWeight: "600", color: "white" },

  confirm_button_style: {
    backgroundColor: "orange",
    padding: 4,
    borderRadius: 20,
    marginLeft: 20,
    shadowOffset: { width: 2, height: 2 },
    elevation: 1,

    shadowOpacity: 0.25,
    shadowColor: "black",
  },
  message_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },
  message_style: {
    fontWeight: "400",
    fontSize: 16,
  },
  title_style: {
    fontWeight: "900",
    fontSize: 30,
  },
});
