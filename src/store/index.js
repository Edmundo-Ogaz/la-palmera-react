import { configureStore } from '@reduxjs/toolkit';
import comunaReducer from './comunaReducer'

export const store = configureStore({
  reducer: {
    comuna: comunaReducer
  },
});
