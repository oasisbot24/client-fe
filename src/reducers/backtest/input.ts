import BacktestInput from '@interface/BacktestInput';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initBacktestInput: BacktestInput = {
  preset: '',
  startAccount: 0,
  startDate: '',
  endDate: '',
};

/* Slice */
const backtestInputSlice = createSlice({
  name: 'backtestState',
  initialState: initBacktestInput,
  reducers: {
    setInput: (state, action: PayloadAction<BacktestInput>) => {
      return action.payload;
    },
  },
});

export default backtestInputSlice;
