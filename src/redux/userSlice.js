import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    POINTS: 0,
    WON: 0,
    LOST: 0,
    PLAYED: 0,
    STREAK: 0,
    MAX_STREAK: 0,
    POINTS_GAINED: 0,
    GUESSES: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
    },
  },
  USER_NAME: "",
  USER_ID: "",
  BOOST: {},
  PURCHASES: { WCOINS: 1000 },
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    buyWcoins: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          WCOINS: state.user.WCOINS + action.payload,
        },
      };
    },
    useWcoins: (state, action) => {
      return {
        ...state,
        PURCHASES: {
          ...state.PURCHASES,
          WCOINS: state.PURCHASES.WCOINS - action.payload,
        },
      };
    },

    resetUserStats: (state) => {
      state.user = initialState.user;
    },

    updateSuccessStatus: (state, action) => {
      return {
        ...state,
        PURCHASES: {
          ...state.PURCHASES,
          WCOINS: state.PURCHASES.WCOINS + 10,
        },
        user: {
          ...state.user,
          WON: state.user.WON + 1,
          PLAYED: state.user.PLAYED + 1,
          STREAK: state.user.STREAK + 1,
          POINTS: state.user.POINTS + action.payload,
          POINTS_GAINED: action.payload,
          MAX_STREAK:
            state.user.STREAK >= state.user.MAX_STREAK
              ? state.user.STREAK + 1
              : state.user.MAX_STREAK,
        },
      };
    },
    updateLostStatus: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          LOST: state.user.LOST + 1,
          PLAYED: state.user.PLAYED + 1,
          STREAK: 0,
        },
      };
    },
  },
});

export const {
  updateLostStatus,
  updateSuccessStatus,
  resetUserStats,
  useWcoins,
  buyWcoins,
} = userSlice.actions;
export default userSlice.reducer;
