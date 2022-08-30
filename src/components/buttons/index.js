import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export const Wcoins = ({
  disabled = false,
  onPress = () => {},
  style = {},
  children,
  width = 35,
  bg = "#edcc5f",
  height = 35,
  borderColor = "#c2a444",
  title = "W",
  borderBottomWidth = 4,
  borderRightWidth = 4,

  textStyle = { textAlign: "center", fontSize: 22, fontWeight: "bold" },
}) => {
  return (
    <StyledButton
      title={title}
      width={width}
      height={height}
      borderColor={borderColor}
      borderBottomWidth={borderBottomWidth}
      borderRightWidth={borderRightWidth}
      bg={bg}
      textStyle={textStyle}
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
  textStyle = { textAlign: "center", fontSize: 22, fontWeight: "bold" },
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
      <Text style={[textStyle, { color: colors.buttonText }]}>{title}</Text>
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
