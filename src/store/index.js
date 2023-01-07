import { configureStore } from '@reduxjs/toolkit';
import comunaReducer from './comunaReducer';
import cityReducer from './cityReducer';

export const store = configureStore({
  reducer: {
    comuna: comunaReducer,
    city: cityReducer
  },
});
