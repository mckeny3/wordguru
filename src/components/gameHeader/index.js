import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import { styles } from "./gameHeaderStyles.js";
import { STAR_PNG } from "../../constans.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

const GameHeader = () => {
  const { game } = useSelector((state) => state.reducer.game);
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();

  return (
    <View style={styles.gameHeader}>
      <View style={styles.gameHeader_left}>
        <Ionicons size={30} style={styles.gameHeader_menu_icon} name="menu" />
      </View>
      <View style={styles.gameHeader_middle}>
        <Text style={styles.gameHeader_level}>Level {game.LEVEL}</Text>
      </View>
      <View style={styles.gameHeader_right}>
        <Ionicons
          size={20}
          style={styles.gameHeader_cart_icon}
          name="cart-outline"
        />
        <Text style={styles.game_header_stars_num}>0</Text>
        <Image source={{ uri: STAR_PNG }} style={styles.game_star_img} />
      </View>
    </View>
  );
};

export default GameHeader;
