import { createSlice } from '@reduxjs/toolkit';
import { setState } from '$utils/globals';
import { ErrorResponse } from '$services/Types';
const INIT_STATE: {
  [key: string]: ErrorResponse;
} = {};
const ErrorSlice = createSlice({
  name: 'Error',
  initialState: INIT_STATE,
  reducers: {
    setState,
  },
});
export const ErrorActions = ErrorSlice.actions;
export const ErrorReducer = ErrorSlice.reducer;
