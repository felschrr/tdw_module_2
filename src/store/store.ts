import { configureStore } from '@reduxjs/toolkit'
import balanceReducer, { type BalanceState } from './balanceSlice'

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
})

export interface RootState {
  balance: BalanceState
}

export type AppDispatch = typeof store.dispatch