import { createSlice } from "@reduxjs/toolkit";
import { getStringArray } from "../helperFunctions";

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
      RANDOM_WORD: "",
      colIndex: 0,
      rowIndex: 0,
      ATTEMPTS: 6,
      darkMode: false,
    },
    ROW_ARRAY: new Array(6).fill(
      new Array(5).fill({ value: "", color: "grey" })
    ),
    ROW_ARRAY_NEW: new Array(6).fill(
      new Array(5).fill({ value: "", color: "grey" })
    ),
  },
  reducers: {
    setRandomWord: (state, action) => {
      return { ...state, game: { ...state.game, RANDOM_WORD: action.payload } };
    },
    updateColor: (state, action) => {
      let copy = [...state.ROW_ARRAY.map((row) => [...row])];

      copy[state.game.rowIndex].map((row, i) => {
        if (state.game.RANDOM_WORD[i] === row.value) {
          return { ...(row.color = "green") };
        }

        if (state.game.RANDOM_WORD.includes(row.value)) {
          console.log("included");
          return { ...(row.color = "orange") };
        }
        return { ...(row.color = "grey") };
      });
    },
    setArrayRow: (state, action) => {
      state.ROW_ARRAY = action.payload;
    },
    updateGame: (state, action) => {
      state.game = action.payload;
    },
    updateWordLength: (state, action) => {
      return { game, wordLength: 7 };
    },
    updateSuccessStats: (state, action) => {
      return { ...state, game: { ...state.game, WON: true, MODAL_OPEN: true } };
    },
    setNextLvl: (state) => {
      return {
        ...state,
        ROW_ARRAY: state.ROW_ARRAY_NEW,
        game: {
          ...state.game,
          LEVEL: state.game.LEVEL + 1,
          MODAL_OPEN: false,
          WON: false,
        },
      };
    },
    setColIndex: (state, action) => {
      state.game.colIndex = action.payload;
    },
    setRowIndex: (state, action) => {
      return { ...state, game: { ...state.game, rowIndex: action.payload } };
    },
  },
});

export const {
  setRandomWord,
  updateColor,
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
