import { all, takeEvery } from 'redux-saga/effects';
import { HomeActions, fetchData } from './HomeSlice';

export default function* Saga() {
  yield all([takeEvery(HomeActions.fetchData.type, fetchData)]);
}
