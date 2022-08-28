import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import BottomAds from "./components/ads";
import HomeScreen from "./screens/homeScreen";
import PurchaseScreen from "./screens/purshaseScreen";
import WelcomeScreen from "./screens/welcomeScreen";
import { darkTheme, MyTheme } from "./theme";

export default function Root() {
  const Stack = createNativeStackNavigator();
  const { settings } = useSelector((state) => state.reducer.game);

  return (
    <>
      <NavigationContainer theme={settings.DARK_MODE ? darkTheme : MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="welcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="purchaseScreen"
            component={PurchaseScreen}
            options={{ headerShown: false, title: "" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
