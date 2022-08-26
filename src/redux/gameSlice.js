import { createSlice } from "@reduxjs/toolkit";
import { getStringArray } from "../helperFunctions";
const initialState = {
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
    INIT: false,
    KEY_COLOR: [],
  },
  ROW_ARRAY: new Array(6).fill(
    new Array(5).fill({ value: "", color: "'yellow" })
  ),
  ROW_ARRAY_NEW: new Array(6).fill(
    new Array(5).fill({ value: "", color: "#ddd" })
  ),
  settings: {
    DARK_MODE: false,
  },
  keyboard: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],

    ["Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ],
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    setKeysColor: (state, actions) => {
      let copy = [...state.keyboard.map((row) => [...row])];

      copy.map((row) =>
        row.map((keys) => {
          if (keys === "A") {
            console.log("match");

            return { ...(keys.color = "red") };
          }
        })
      );
    },
    setDarkMode: (state, action) => {
      return {
        ...state,
        settings: { ...state.settings, DARK_MODE: !state.settings.DARK_MODE },
      };
    },
    resetGame: (state) => (state = initialState),
    setNewGame: (state, action) => {
      return { ...state, game: { ...state.game, INIT: action.payload } };
    },
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
          return { ...(row.color = "orange") };
        }
        if (!state.game.RANDOM_WORD.includes(row.value)) {
        }
        return { ...(row.color = "grey") };
      });
    },
    setArrayRow: (state, action) => {
      state.ROW_ARRAY = action.payload;
    },
    endGame: (state, action) => {
      return {
        ...state,
        game: {
          ...state.game,
          WON: action.payload.result,
          MODAL_OPEN: action.payload.modal,
          colIndex: action.payload.colInex,
          rowIndex: action.payload.rowIndex,
        },
      };
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
          colIndex: 0,
          rowIndex: 0,
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
  resetGame,
  setDarkMode,
  setKeysColor,
  setNewGame,
  setRandomWord,
  updateColor,
  setArrayRow,
  setRowIndex,
  setColIndex,
  setNextLvl,
  endGame,
} = gameSlice.actions;
export default gameSlice.reducer;
