import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initBacktestState: BacktestState = {
  isRunning: false,
  account: null,
};

/* Slice */
const backtestStateSlice = createSlice({
  name: 'backtestState',
  initialState: initBacktestState,
  reducers: {
    setState: (state, action: PayloadAction<BacktestState>) => {
      return action.payload;
    },
  },
});

export default backtestStateSlice;
