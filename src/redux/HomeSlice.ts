import { createSlice } from '@reduxjs/toolkit';
import { setState } from '$utils/globals';
import Api from '$services/Api';
import { call, put } from 'redux-saga/effects';
import { User } from '$services/Types';
const INIT_STATE: {
  users: User[];
} = { users: [] };
const HomeSlice = createSlice({
  name: 'Home',
  initialState: INIT_STATE,
  reducers: {
    setState,
    fetchData: () => {},
  },
});

export function* fetchData() {
  const res: User[] = yield call(Api.fetchData);
  yield put(
    HomeActions.setState({
      users: res,
    }),
  );
}

export const HomeActions = HomeSlice.actions;
export const HomeReducer = HomeSlice.reducer;
