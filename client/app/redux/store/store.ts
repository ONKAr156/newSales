import { configureStore  } from '@reduxjs/toolkit'
import { loginApi } from '../api/loginApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [loginApi.reducerPath]: loginApi.reducer,
    },
    // middleware:(def) => [...def(),loginApi.middleware]
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']