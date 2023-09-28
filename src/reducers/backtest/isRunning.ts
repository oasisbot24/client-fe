import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initBacktestIsRunning: {value: boolean} = {value: false};

/* Slice */
const backtestIsRunningSlice = createSlice({
  name: 'backtestIsRunning',
  initialState: initBacktestIsRunning,
  reducers: {
    setIsRunning: (state, action: PayloadAction<{value: boolean}>) => {
      return action.payload;
    },
  },
});

export default backtestIsRunningSlice;
