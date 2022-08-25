import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    USER_NAME: null,
    LEVEL: 0,
    STARS: 0,
    WON: 0,
    LOST: 0,
    PLAYED: 0,
    STREAK: 0,
    MAX_STREAK: 0,
  },
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUserStats: (state) => (state = initialState),

    updateSuccessStatus: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          WON: state.user.WON + 1,
          PLAYED: state.user.PLAYED + 1,
          STREAK: state.user.STREAK + 1,
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
          MAX_STREAK: state.user.MAX_STREAK + 1,
        },
      };
    },
  },
});

export const { updateLostStatus, updateSuccessStatus, resetUserStats } =
  userSlice.actions;
export default userSlice.reducer;
