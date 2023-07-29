import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initBacktestIsRunning: boolean = false;

/* Slice */
const backtestIsRunningSlice = createSlice({
  name: 'backtestIsRunning',
  initialState: initBacktestIsRunning,
  reducers: {
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default backtestIsRunningSlice;
