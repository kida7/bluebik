import { createSlice } from '@reduxjs/toolkit';
import { setState } from '$utils/globals';
const INIT_STATE: {} = {};
const SettingsSlice = createSlice({
  name: 'Settings',
  initialState: INIT_STATE,
  reducers: {
    setState,
  },
});
export const SettingsActions = SettingsSlice.actions;
export const SettingsReducer = SettingsSlice.reducer;
