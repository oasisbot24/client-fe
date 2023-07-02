import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initInfo: {
  version: string;
  usdtToKrw: {date: string; krw: number};
} = {
  version: '',
  usdtToKrw: {date: '0000-00-00', krw: 0},
};

/* Slice */
const commonFileSlice = createSlice({
  name: 'commonInfo',
  initialState: initInfo,
  reducers: {
    setVersion: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
      return state;
    },
    setUsdtToKrw: (
      state,
      action: PayloadAction<{date: string; krw: number}>,
    ) => {
      state.usdtToKrw = action.payload;
      return state;
    },
  },
});

export default commonFileSlice;
