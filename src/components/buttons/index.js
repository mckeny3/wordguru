import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export const Wcoins = () => {
  return (
    <StyledButton
      width={35}
      height={35}
      bg="#edcc5f"
      borderColor={"#c2a444"}
      title="W"
      borderBottomWidth={4}
      borderRightWidth={4}
    />
  );
};

const StyledButton = ({
  title,
  disabled = false,
  bg,
  onPress = () => {},
  style = {},
  children,
  width,
  borderColor,
  height,
  borderBottomWidth,
  borderRightWidth,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onPress()}
      type="submit"
      style={[
        styles(width).submit_button,
        {
          borderBottomWidth: borderBottomWidth || 6,
          borderRightWidth: borderRightWidth || 6,
          height: height || 55,
          shadowColor: borderColor || colors.border,
          borderColor: borderColor || colors.border,
          backgroundColor: bg || colors.primary,
        },
        { style },
      ]}
    >
      <Text style={[styles().submit_text, { color: colors.buttonText }]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default StyledButton;

const styles = (width) =>
  StyleSheet.create({
    submit_button: {
      borderRadius: 40,

      padding: 1,
      elevation: 2,
      shadowOffset: {
        width: 8,
        height: 8,
      },
      width: width || 150,
      alignItems: "center",
      justifyContent: "center",
    },

    submit_text: {
      textAlign: "center",
      fontSize: 22,
      fontWeight: "bold",
    },
  });
