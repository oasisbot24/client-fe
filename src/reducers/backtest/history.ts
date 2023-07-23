import HistoryTrade from '@interface/history/HistoryTrade';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initHistory: HistoryTrade[] = [];

/* Slice */
const backtestHistorySlice = createSlice({
  name: 'backtestHistory',
  initialState: initHistory,
  reducers: {
    addHistory: (state, action: PayloadAction<HistoryTrade>) => {
      state.unshift(action.payload);
      return state;
    },
    setHistory: (state, action: PayloadAction<HistoryTrade[]>) => {
      return action.payload;
    },
  },
});

export default backtestHistorySlice;
