// import { store } from '$redux';
// import { ErrorActions } from '$redux/ErrorSlice';
// import { ErrorResponse } from '$services/Types';
import { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

//@ts-ignore
export const setState = (state, action: PayloadAction<Object>) => {
  Object.keys(action.payload).forEach(key => {
    //@ts-ignore
    state[key] = action.payload[key];
  });
};

// export function setErrorState(key: string, error: ErrorResponse) {
//   store.dispatch(ErrorActions.setState({ [key]: error }));
// }

const divisions = [3600, 60];

export function formatDuration(seconds: number) {
  let remain = seconds;
  let result = [];
  divisions.forEach(t => {
    result.push(Math.floor(remain / t));
    remain %= t;
  });
  result.push(remain);
  return result
    .filter((t, index) => index !== 0 || t > 0)
    .map(t => _.padStart(t + '', 2, '0'))
    .join(':');
}
