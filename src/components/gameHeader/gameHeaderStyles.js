import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  gameHeader: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "#A9A9A9",
    marginHorizontal: 10,
  },
  gameHeader_right: {
    flexDirection: "row",
    alignItems: "center",

    padding: 2,
    borderRadius: 8,

    backgroundColor: "grey",
  },

  gameHeader_left: {
    flexDirection: "row",
  },
  gameHeader_middle: {},

  gameHeader_level: {
    fontWeight: "bold",

    fontSize: 20,
  },
  game_star_img: {
    width: 15,
    height: 15,
  },
  game_header_stars_num: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ddd",
    marginRight: 10,
  },
  gameHeader_menu_icon: {},
  gameHeader_cart_icon: {
    color: "white",
    marginRight: 10,
  },
});
