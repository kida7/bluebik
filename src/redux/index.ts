import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import Saga from './Saga';
import Rehydration from './Rehydration';
import {
  configureStore,
  combineReducers,
  MiddlewareArray,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { ErrorReducer } from './ErrorSlice';
import AsyncStorage from '@react-native-community/async-storage';
import { HomeReducer } from './HomeSlice';
import { OnboardingReducer } from './Onboarding';

const sagaMiddleware = createSagaMiddleware();

export const reducers = combineReducers({
  // Error: ErrorReducer,
  Home: HomeReducer,
  Onboarding: OnboardingReducer,
});

const finalReducers = persistReducer(
  {
    key: 'primary',
    whitelist: ['storage'],
    storage: AsyncStorage,
  },
  reducers,
);

const store = configureStore({
  reducer: finalReducers,
  middleware: new MiddlewareArray().concat(sagaMiddleware),
});

sagaMiddleware.run(Saga);

let persistor = Rehydration.updateReducers(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
