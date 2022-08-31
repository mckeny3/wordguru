import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./gameHeaderStyles.js";
import { STAR_PNG } from "../../constans.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useTheme } from "@react-navigation/native";
import SettingsModal from "../settingsModal/index.jsx";
import { Wcoins } from "../buttons/index.js";

const GameHeader = () => {
  const [visible, setVisible] = useState(false);
  const [isSettingsModalOpen, toggleSettingsModal] = useState(false);
  const { game } = useSelector((state) => state.reducer.game);
  const { user, PURCHASES, USER_NAME } = useSelector(
    (state) => state.reducer.user
  );
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[styles.gameHeader]}>
      <Modal transparent={true} visible={isSettingsModalOpen}>
        <SettingsModal toggle={toggleSettingsModal} />
      </Modal>
      <View style={[styles.gameHeader_left, { backgroundColor: colors.card }]}>
        <Pressable onPress={() => navigation.navigate("welcomeScreen")}>
          <Ionicons
            color={colors.primary}
            size={30}
            style={styles.gameHeader_menu_icon}
            name="home"
          />
        </Pressable>

        <Pressable onPress={() => toggleSettingsModal((prev) => !prev)}>
          <Ionicons
            color={colors.primary}
            size={30}
            style={styles.gameHeader_menu_icon}
            name="settings-outline"
          />
        </Pressable>
      </View>
      <View
        style={[styles.gameHeader_middle, { backgroundColor: colors.card }]}
      >
        <Text style={[styles.gameHeader_level, { color: colors.textSoft }]}>
          Points {user.POINTS}
        </Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate("paywallScreen")}
        style={[styles.gameHeader_right, { backgroundColor: colors.card }]}
      >
        <Text
          onPress={() => navigation.navigate("paywallScreen")}
          style={[styles.game_header_stars_num, { color: colors.textSoft }]}
        >
          {PURCHASES.WCOINS}
        </Text>
        <Wcoins onPress={() => navigation.navigate("paywallScreen")} />
      </Pressable>
    </SafeAreaView>
  );
};

export default GameHeader;
