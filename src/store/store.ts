import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "@/slices/mapSlice";

export const store = configureStore({
  reducer: {
    map: mapSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
