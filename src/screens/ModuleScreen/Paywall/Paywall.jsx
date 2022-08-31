import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import fontAwsome from "react-native-vector-icons/FontAwesome";
import StyledButton from "../../../components/buttons";
import { value_pack } from "../../../data/purchaseItems";
import { activateAdapty, adapty } from "react-native-adapty";
import * as InAppPurchases from "expo-in-app-purchases";

const Paywall = () => {
  const dispatch = useDispatch();
  const { game } = useSelector((state) => state.reducer.game);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [error, setError] = useState(null);
  const [paywall, setPaywall] = useState(null);
  useEffect(() => {
    activateAdapty({
      sdkKey: "public_live_1gRyYBRU.641UQfkfxwG6YK58hkWV",
      //customerUserId,
    });

    const fetchData = async () => {
      try {
        const { paywalls, products } = await adapty.paywalls.getPaywalls({
          forceUpdate: true,
        });
        // or
        //adapty.paywalls.getPaywalls({ forceUpdate: true });
        if (paywalls.length > 0) {
          setPaywall(paywalls[0]);
        }
      } catch (error) {
        setError(error.message);
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  if (!paywall) {
    return <ActivityIndicator />;
  }
  console.log("paywall", paywall.products);
  const paywallData = JSON.parse(paywall.customPayloadString || "{}");

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
      <View style={styles().title_wrapper}>
        <Text style={styles().title_style}>{paywallData.title || WCOINs}</Text>
      </View>
      <ScrollView>
        {paywall?.products.map((item, index) => (
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
                <Text style={styles().value_item_text}>
                  {item.localizedTitle.substring(0, 10)}
                </Text>
              </View>

              <View style={styles().value_items_right}>
                <Text style={styles().value_price}>
                  <StyledButton
                    title={item.localizedPrice}
                    width={80}
                    height={40}
                    borderBottomWidth={4}
                    borderRightWidth={4}
                  />{" "}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Paywall;

const styles = (colors) =>
  StyleSheet.create({
    wrapper: {
      alignSelf: "stretch",
      flex: 1,
      padding: 10,
      backgroundColor: "rgb(57, 53, 53)",
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
      marginHorizontal: 10,
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
    title_wrapper: {
      justifyContent: "center",
      alignItems: "center",
      //backgroundColor: "black",
      height: 80,
    },
    title_style: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#f7f7f7",
    },
  });
