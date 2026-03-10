import { createSlice } from '@reduxjs/toolkit';

const bankingSlice = createSlice({
  name: 'banking',
  initialState: {
    balance: 0,
    history: [],
  },
  reducers: {
    setInitialData: (state, action) => {
      state.balance = action.payload.balance;
      state.history = action.payload.history;
    },
    updateBalance: (state, action) => {
      const { type, amount } = action.payload;
      if (type === 'deposit') {
        state.balance += amount;
      } else {
        state.balance -= amount;
      }
    },
    addTransaction: (state, action) => {
      state.history.unshift(action.payload);
    },
  },
});

export const { setInitialData, updateBalance, addTransaction } = bankingSlice.actions;
export default bankingSlice.reducer;