import { configureStore } from '@reduxjs/toolkit'
import balanceReducer, { type BalanceState } from './balanceSlice'
import cardsReducer, { type CardsState } from './cardsSlice'

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
    cards: cardsReducer
  },
})

export interface RootState {
  balance: BalanceState
  cards: CardsState
}

export type AppDispatch = typeof store.dispatch