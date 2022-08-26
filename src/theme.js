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
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
    buttonActive: "rgb(10, 132, 255)",
    buttonDisable: "#606060",
    buttonText: "white",
    shadow: "black",
  },
};
export const darkTheme = {
  colors: {
    background: "rgb(1, 1, 1)",
    border: "rgb(39, 39, 41)",
    card: "rgb(18, 18, 18)",
    notification: "rgb(255, 69, 58)",
    primary: "rgb(10, 132, 255)",
    buttonActive: "rgb(10, 132, 255)",
    buttonDisable: "#606060",
    buttonText: "white",
    text: "rgb(229, 229, 231)",
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
