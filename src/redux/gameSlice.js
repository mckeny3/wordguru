import { createSlice } from "@reduxjs/toolkit";
import { dangerColor } from "../constans";
import { word } from "../data";
import { getStringArray } from "../helperFunctions";
const initialState = {
  game: {
    MODAL_OPEN: false,
    END: false,
    PLAYING: false,
    WON: false,
    LOST: false,
    wordLength: 5,
    RANDOM_WORD: "",
    colIndex: 0,
    rowIndex: 0,
    ATTEMPTS: 6,
    INIT: false,
    KEY_COLOR: [],
  },
  ROW_ARRAY: new Array(6).fill(
    new Array(5).fill({ value: "", color: "transparent" })
  ),
  ROW_ARRAY_NEW: new Array(6).fill(
    new Array(5).fill({ value: "", color: "#ddd" })
  ),
  settings: {
    DARK_MODE: false,
    RANDOM_COLOR: "",
  },
  keyboard: [
    [
      { value: "Q", k_color: "transparent", color: "" },
      { value: "W", k_color: "transparent", color: "" },
      { value: "E", k_color: "transparent", color: "" },
      { value: "R", k_color: "transparent", color: "" },
      { value: "T", k_color: "transparent", color: "" },
      { value: "Y", k_color: "transparent", color: "" },
      { value: "U", k_color: "transparent", color: "" },
      { value: "I", k_color: "transparent", color: "" },
      { value: "O", k_color: "transparent", color: "" },
      { value: "P", k_color: "transparent", color: "" },
    ],
    [
      { value: "A", k_color: "transparent", color: "" },
      { value: "S", k_color: "transparent", color: "" },
      { value: "D", k_color: "transparent", color: "" },
      { value: "F", k_color: "transparent", color: "" },
      { value: "G", k_color: "transparent", color: "" },
      { value: "H", k_color: "transparent", color: "" },
      { value: "J", k_color: "transparent", color: "" },
      { value: "K", k_color: "transparent", color: "" },
      { value: "L", k_color: "transparent", color: "" },
    ],

    [
      { value: "Z", k_color: "transparent", color: "" },
      { value: "X", k_color: "transparent", color: "" },
      { value: "C", k_color: "transparent", color: "" },
      { value: "V", k_color: "transparent", color: "" },
      { value: "B", k_color: "transparent", color: "" },
      { value: "N", k_color: "transparent", color: "" },
      { value: "M", k_color: "transparent", color: "" },
      { value: "DEL", k_color: "transparent", color: "" },
    ],
  ],
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    setRandomColor: (state, action) => {
      state.settings.RANDOM_COLOR = action.payload;
    },

    setKeysColor: (state, actions) => {},
    setDarkMode: (state, action) => {
      return {
        ...state,
        settings: { ...state.settings, DARK_MODE: !state.settings.DARK_MODE },
      };
    },
    resetGame: (state) => {
      state = initialState;

      return {
        ...state,
        game: {
          ...state.game,
          RANDOM_WORD: word[Math.floor(Math.random() * word.length)],
        },
      };
    },

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
          state.keyboard.map((keysRow) =>
            keysRow.map((key) => {
              if (row.value.includes(key.value)) {
                return { ...(key.k_color = "green") };
              }
            })
          );
          return { ...(row.color = "green") };
        }

        if (state.game.RANDOM_WORD.includes(row.value)) {
          state.keyboard.map((keysRow) =>
            keysRow.map((key) => {
              if (row.value.includes(key.value) && key.k_color !== "green") {
                return { ...(key.k_color = "orange") };
              }
            })
          );

          return { ...(row.color = "orange") };
        }
        if (!state.game.RANDOM_WORD.includes(row.value)) {
          state.keyboard.map((keysRow) =>
            keysRow.map((key) => {
              if (row.value === key.value) {
                /*                 return { ...(key.k_color = "grey") };
                 */
                return { ...(key.k_color = "grey") };
              }
            })
          );

          return { ...(row.color = dangerColor) };
        }
      });
    },
    setArrayRow: (state, action) => {
      state.ROW_ARRAY = action.payload;
    },
    endGame: (state, action) => {
      return {
        ...state,

        ROW_ARRAY: initialState.ROW_ARRAY,
        keyboard: initialState.keyboard,
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
        ROW_ARRAY: initialState.ROW_ARRAY,
        keyboard: initialState.keyboard,

        game: {
          ...state.game,
          MODAL_OPEN: false,
          WON: false,
          colIndex: 0,
          rowIndex: 0,
          RANDOM_WORD: word[Math.floor(Math.random() * word.length)],
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
  setRandomColor,
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
