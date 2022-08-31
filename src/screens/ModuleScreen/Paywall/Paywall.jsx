import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { adapty, AdaptyError } from "react-native-adapty";
import { useState } from "react";

const Paywall = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { paywalls, products } = await adapty.paywalls.getPaywalls();
        // or
        adapty.paywalls.getPaywalls({ forceUpdate: true });
        setError(paywalls);
        setError(products);
        console.log("suceSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
      } catch (error) {
        setError(error.message);
        console.log("FAILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.paywall_wrapper}>
      <Text>sss{console.log(error)}</Text>
    </View>
  );
};

export default Paywall;

const styles = StyleSheet.create({
  paywall_wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
