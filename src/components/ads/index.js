import React from "react";
import { Text, StyleSheet, useColorScheme, View } from "react-native";

const App = () => {
  return (
    <View
      style={[
        styles.box,
        {
          transform: [{ translateX: 50 }],
        },
      ]}
    >
      <Text style={styles.text}>TranslateX by -50 </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
