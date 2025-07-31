import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { tasksApi } from '../services/tasksApi';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [tasksApi.reducerPath],
};

const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tasksApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export const getReduxState = () => store.getState();
export type AppDispatch = typeof store.dispatch;
