import { View, Text, Image, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { styles } from "./gameHeaderStyles.js";
import { STAR_PNG } from "../../constans.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useTheme } from "@react-navigation/native";

const GameHeader = () => {
  const { game } = useSelector((state) => state.reducer.game);
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[styles.gameHeader]}>
      <View style={[styles.gameHeader_left, { backgroundColor: colors.card }]}>
        <Pressable onPress={() => navigation.navigate("welcomeScreen")}>
          <Ionicons
            color={colors.primary}
            size={30}
            style={styles.gameHeader_menu_icon}
            name="home"
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("welcomeScreen")}>
          <Ionicons
            color={colors.primary}
            size={30}
            style={styles.gameHeader_menu_icon}
            name="settings"
          />
        </Pressable>
      </View>
      <View
        style={[styles.gameHeader_middle, { backgroundColor: colors.card }]}
      >
        <Text style={[styles.gameHeader_level, { color: colors.text }]}>
          Level {game.LEVEL}
        </Text>
      </View>
      <View style={[styles.gameHeader_right, { backgroundColor: colors.card }]}>
        <Ionicons
          size={20}
          style={styles.gameHeader_cart_icon}
          name="cart-outline"
        />
        <Text style={styles.game_header_stars_num}>{user.STARS}</Text>
        <Image source={{ uri: STAR_PNG }} style={styles.game_star_img} />
      </View>
    </SafeAreaView>
  );
};

export default GameHeader;
