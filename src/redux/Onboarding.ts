import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { setState } from '$utils/globals';
const INIT_STATE: {
  fullName?: string;
  idNumber?: string;
  email?: string;
  phoneNumber?: string;
  dob?: Date;
  purpose?: string[];
} = {};
const OnboardingSlice = createSlice({
  name: 'Onboarding',
  initialState: INIT_STATE,
  reducers: {
    setState,
    handleCheck: (
      state: any,
      action: PayloadAction<{ field: string; value: string }>,
    ) => {
      let { field, value } = action.payload;
      let data = state[field] || [];
      let item = data.find((t: string) => t == value);
      if (item) state[field] = data.filter((t: string) => t != value);
      else {
        data.push(value);
        state[field] = data;
      }
    },
  },
});
export const OnboardingActions = OnboardingSlice.actions;
export const OnboardingReducer = OnboardingSlice.reducer;
