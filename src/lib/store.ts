import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice"

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  },
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
