import appSlice from '../features/appController/AppSlice';
import userSlice from './../features/user/UserSlice'
import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'app']
}

const rootReducer = combineReducers(
  {
    user: userSlice,
    app: appSlice
  }
)

const persistReducer_ = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistReducer_,
);

const persistor = persistStore(store);
export { store, persistor }
