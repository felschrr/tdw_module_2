import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BalanceState {
  balance: number
}

const initialState: BalanceState = {
  balance: 1000,
}

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    decrease: (state, action: PayloadAction<number>) => {
      if (action.payload > 0 && action.payload <= state.balance) {
        state.balance -= action.payload
      }
    },
    increase: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        state.balance += action.payload
      }
    },
  },
})

export const { decrease, increase } = balanceSlice.actions
export default balanceSlice.reducer