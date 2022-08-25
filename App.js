import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, useColorScheme } from "react-native";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import BottomAds from "./src/components/ads";
import Root from "./src/root";
export default function App() {
  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  return (
    <>
      <Provider store={store}>
        <Root />
      </Provider>
      <BottomAds />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
