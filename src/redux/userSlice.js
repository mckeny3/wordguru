import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    USER_NAME: null,
    POINTS: 0,
    WCOINS: 500,
    WON: 0,
    LOST: 0,
    PLAYED: 0,
    STREAK: 0,
    MAX_STREAK: 0,
    GUESSES: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
    },
    BOOST: {},
  },
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
        user: {
          ...state.user,
          WCOINS: state.user.WCOINS - action.payload,
        },
      };
    },

    resetUserStats: (state) => (state = initialState),

    updateSuccessStatus: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          WON: state.user.WON + 1,
          PLAYED: state.user.PLAYED + 1,
          STREAK: state.user.STREAK + 1,
          POINTS: state.user.POINTS + action.payload,
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
