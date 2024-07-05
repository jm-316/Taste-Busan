import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location, StoreType } from "@/interface";

const DEFAULT_LAT = 35.156233328065;
const DEFAULT_LNG = 129.05793488419;
const DEFAULT_ZOOM = 3;

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    locationState: {
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
      zoom: DEFAULT_ZOOM,
    },
    currentStoreState: null as StoreType | null,
  },
  reducers: {
    setCurrentStore: (state, action: PayloadAction<StoreType | null>) => {
      state.currentStoreState = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.locationState = action.payload;
    },
  },
});

export const { setCurrentStore, setLocation } = mapSlice.actions;

export default mapSlice.reducer;
