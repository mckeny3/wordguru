import AsyncStorage from "@react-native-community/async-storage";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice.js";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";

import { rootReducer } from "./index.js";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
  middleware: [thunk],
});
export const persistor = persistStore(store);
