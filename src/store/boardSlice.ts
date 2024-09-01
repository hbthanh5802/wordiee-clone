import { createSlice } from '@reduxjs/toolkit';
import wordListJson from '@/word.json';

const getRandomWord = (): string => {
  const list = wordListJson.words;
  const randomNumber = Math.floor(Math.random() * list.length);
  return list[randomNumber].toUpperCase();
};

const initialState = {
  board: Array(30).fill(''),
  currentPosition: 0,
  currentRow: 0,
  keyTracking: '',
  correctWord: getRandomWord(),
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    incrementPosition: (state) => {
      state.currentPosition += 1;
    },
    decrementPosition: (state) => {
      state.currentPosition -= 1;
    },
    increaseRow: (state) => {
      state.currentRow++;
    },
    decreaseRow: (state) => {
      state.currentRow--;
    },
    setKeyTracking: (state, action) => {
      state.keyTracking = action.payload;
    },
    resetCorrectWord: (state) => {
      state.correctWord = getRandomWord();
    },
    resetBoardState: (state) => {
      state.board = Array(30).fill('');
      state.currentPosition = 0;
      state.currentRow = 0;
      state.keyTracking = '';
      state.correctWord = getRandomWord();
    },
  },
});

export const {
  setBoard,
  incrementPosition,
  decrementPosition,
  increaseRow,
  decreaseRow,
  setKeyTracking,
  resetCorrectWord,
  resetBoardState,
} = boardSlice.actions;
export default boardSlice.reducer;
