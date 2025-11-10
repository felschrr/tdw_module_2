import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Card {
  id: string
  number: string
  holderName: string
  expiryDate: string
  balance: number
}

export interface CardsState {
  cards: Card[]
  selectedCardId: string | null
}

const initialState: CardsState = {
  cards: [
    {
      id: '1',
      number: '1234 5678 9012 3456',
      holderName: 'John Doe',
      expiryDate: '12/25',
      balance: 500,
    },
    {
      id: '2',
      number: '9876 5432 1098 7654',
      holderName: 'Jane Smith',
      expiryDate: '11/24',
      balance: 750,
    },
  ],
  selectedCardId: '1',
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<string>) => {
      state.selectedCardId = action.payload;
    },
    updateBalance: (state, action: PayloadAction<{id: string, amount: number}>) => {
      const card = state.cards.find(c => c.id === action.payload.id);
      if (card) {
        card.balance += action.payload.amount;
      }
    },
  },
})

export const { select, updateBalance } = cardsSlice.actions
export default cardsSlice.reducer