import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice.js";
import thunk from "redux-thunk";

import { rootReducer } from "./index.js";
export const store = configureStore({
  reducer: { reducer: rootReducer, middleware: [thunk] },
});
