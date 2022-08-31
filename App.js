import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LogBox,
  Platform,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./src/redux/store";
import BottomAds from "./src/components/ads";
import { connectToDevTools } from "react-devtools-core";
import { activateAdapty } from "react-native-adapty";

import Root from "./src/root";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
LogBox.ignoreLogs(["NativeEventEmitter()"]);
export default function App() {
  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  /*   if (__DEV__) {
    connectToDevTools({ host: "localhost", port: 8097 });
  } */

  useEffect(() => {
    activateAdapty({ sdkKey: "public_live_1gRyYBRU.641UQfkfxwG6YK58hkWV" });
  }, []);
  // ...
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
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
