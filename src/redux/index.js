import userReducer from "./userSlice.js";
import gameReducer from "./gameSlice.js";

import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
});
