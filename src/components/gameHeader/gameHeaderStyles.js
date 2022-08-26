import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  gameHeader: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignSelf: "stretch",
    alignItems: "center",
    marginHorizontal: 4,
  },
  gameHeader_right: {
    flexDirection: "row",
    alignItems: "center",

    padding: 2,
    borderRadius: 8,
  },

  gameHeader_left: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 70,

    padding: 2,
    borderRadius: 8,
  },
  gameHeader_middle: {
    padding: 2,
    borderRadius: 8,
  },

  gameHeader_level: {
    fontWeight: "bold",
    fontStyle: "italic",

    fontSize: 30,
  },
  game_star_img: {
    width: 24,
    height: 24,
    backgroundColor: "#ddd",
    borderRadius: 100,
  },
  game_header_stars_num: {
    fontWeight: "bold",
    fontSize: 24,
    marginRight: 10,
    fontStyle: "italic",
  },
  gameHeader_menu_icon: {},
  gameHeader_cart_icon: {
    color: "white",
    marginRight: 10,
  },
});
