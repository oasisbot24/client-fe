import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initFile: {
  bankname: string;
  currency: string;
  balance: string;
} = {
  bankname: 'upbit',
  currency: 'krw',
  balance: 'API 연결이 필요합니다.',
};

/* Slice */
const commonFileSlice = createSlice({
  name: 'commonBank',
  initialState: initFile,
  reducers: {
    setBankname: (state, action: PayloadAction<string>) => {
      state.bankname = action.payload;
      return state;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
      return state;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
      return state;
    },
  },
});

export default commonFileSlice;
