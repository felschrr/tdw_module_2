import { configureStore } from '@reduxjs/toolkit'
import balanceReducer, { type BalanceState } from './balanceSlice'
import cardsReducer, { type CardsState } from './cardsSlice'
import { petApi } from './petSlice'

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
    cards: cardsReducer,
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware),
})

export interface RootState {
  balance: BalanceState
  cards: CardsState
}

export type AppDispatch = typeof store.dispatch