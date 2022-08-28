import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

export const My = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
  },
};
export const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "white",
    card: "rgb(229, 229, 231)",
    text: "rgb(28, 28, 30)",
    textSoft: "#606060",

    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
    buttonActive: "rgb(10, 132, 255)",
    buttonDisable: "#606060",
    buttonText: "white",
    shadow: "black",
    danger: "#CA0B00",
  },
};
export const darkTheme = {
  colors: {
    dark: true,
    background: "#181818",
    border: "#aaaaaa",
    card: "#606060",
    notification: "rgb(255, 69, 58)",
    primary: "rgb(10, 132, 255)",
    buttonActive: "rgb(10, 132, 255)",
    buttonDisable: "#606060",
    buttonText: "white",
    text: "rgb(229, 229, 231)",
    textSoft: "#aaaaaa",

    danger: "#CA0B00",
  },
  dark: true,
};

/* 
/////////////*    bg:"#181818",
    bgLighter:"#202020",
    text:"white",
    textSoft:"#aaaaaa",
    soft:"#373737"
  }
  export const lightTheme = {
    bg:"#f9f9f9",
    bgLighter:"white",
    text:"black",
    textSoft:"#606060",
    soft:"#f5f5f5"
  } */
