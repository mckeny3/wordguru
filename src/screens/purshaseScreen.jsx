import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import StyledButton from "../components/buttons";
import fontAwsome from "react-native-vector-icons/FontAwesome";
import { value_pack } from "../data/purchaseItems";
const PurchaseScreen = () => {
  const dispatch = useDispatch();
  const { game } = useSelector((state) => state.reducer.game);
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles(colors).wrapper}>
      <View style={{ marginTop: 20 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            color={colors.buttonActive}
            size={40}
            style={styles.gameHeader_menu_icon}
            name="ios-arrow-back"
          />
        </Pressable>
      </View>

      <ScrollView>
        {value_pack.map((item, index) => (
          <View key={index} style={styles(colors.card).value_wrapper}>
            <View style={styles(colors).value_items_left}>
              <View style={styles().value_items}>
                <StyledButton
                  width={40}
                  height={40}
                  bg="#edcc5f"
                  borderColor={"#c2a444"}
                  title="W"
                  borderBottomWidth={4}
                  borderRightWidth={4}
                />
                <Text style={styles().value_item_text}>x{item.quntity}</Text>
              </View>

              <View style={styles().value_items_right}>
                <Text style={styles().value_price}>
                  <StyledButton
                    title={item.price}
                    width={80}
                    height={40}
                    borderBottomWidth={4}
                    borderRightWidth={4}
                  />
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PurchaseScreen;

const styles = (colors) =>
  StyleSheet.create({
    wrapper: {
      alignSelf: "stretch",
      flex: 1,
      padding: 10,
      backgroundColor: "rgb(255, 69, 58)",
    },
    value_wrapper: {
      marginTop: 40,
      backgroundColor: colors,
      padding: 10,
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItemsq: "center",
      alignSelf: "stretch",
      flexDirection: "row",
    },
    value_items: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    value_image: {
      width: 40,
      height: 40,
      borderRadius: 50,
      justifyContent: "space-between",
    },
    value_item_text: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#606060",
    },
    value_items_left: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flex: 1,
    },
    value_items_right: {
      flexDirection: "row",
      justifyContent: "space-between",
      justifyContent: "flex-end",
      alignItems: "center",
      flex: 1,
    },
    value_price: {
      fontWeight: "bold",
      fontSize: 24,
    },
  });
