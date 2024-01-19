import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from '../slice/loginSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [loginSlice.reducerPath]: loginSlice.reducer,
    },
    // middleware:def => [...def(),loginSlice.middleware]
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']