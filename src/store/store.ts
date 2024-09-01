import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardSlice from './boardSlice';

const rootReducers = combineReducers({
  board: boardSlice,
});

export default configureStore({
  reducer: rootReducers,
});
