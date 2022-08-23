import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      USER_NAME: null,
      LEVEL: 0,
      STARS: 0,
      WON: 0,
      LOST: 0,
      PLAYED: 2,
    },
  },
  reducers: {
    updateUserSlice: (state, action) => {
      return { END: true };
    },
  },
});

export const { updateUserSlice } = userSlice.actions;
export default userSlice.reducer;
