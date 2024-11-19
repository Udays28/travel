import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'
import packageReducer from './packageSlice'
import bookingReducer from './bookingSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token']
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    packages: packageReducer,
    bookings: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)