import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    game: {
      MODAL_OPEN: false,
      END: false,
      PLAYING: false,
      LEVEL: 1,
      WON: false,
      LOST: false,
      wordLength: 5,
      rondomWord: "",
      colIndex: 0,
      rowIndex: 0,
      ATTEMPTS: 6,
      darkMode: false,
      ROW_ARRAY: new Array(6).fill(new Array(5).fill("")),
    },
    test: "testing",
  },
  reducers: {
    setArrayRow: (state, action) => {
      state.game.ROW_ARRAY = action.payload;
    },
    updateGame: (state, action) => {
      state.game = action.payload;
    },
    updateWordLength: (state, action) => {
      return { game, wordLength: 7 };
    },
    updateSuccessStats: (state, action) => {
      state.game.MODAL_OPEN = true;
    },
    setNextLvl: (state) => {
      return {
        ...state,
        game: { ...state.game, LEVEL: state.game.LEVEL + 1, MODAL_OPEN: false },
      };
    },
    setColIndex: (state, action) => {
      state.game.colIndex = action.payload;
    },
    setRowIndex: (state, action) => {
      state.game.rowIndex = action.payload;
    },
  },
});

export const {
  setArrayRow,
  setRowIndex,
  setColIndex,
  updateWordLength,
  updateGameState,
  updateGame,
  setNextLvl,
  updateSuccessStats,
} = gameSlice.actions;
export default gameSlice.reducer;
