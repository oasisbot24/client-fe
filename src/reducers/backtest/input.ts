import BacktestInputInterface from '@interface/input/BacktestInputInterface';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initBacktestInput: BacktestInputInterface = {
  preset: '',
  tradeCoin: '',
  startBalance: 0,
  startDate: '',
  endDate: '',
};

/* Slice */
const backtestInputSlice = createSlice({
  name: 'backtestState',
  initialState: initBacktestInput,
  reducers: {
    setInput: (state, action: PayloadAction<BacktestInputInterface>) => {
      return action.payload;
    },
  },
});

export default backtestInputSlice;
