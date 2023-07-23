import HistoryTrade from '@interface/history/HistoryTrade';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initHistory: HistoryTrade[] = [];

/* Slice */
const oasisbotHistorySlice = createSlice({
  name: 'oasisbotHistory',
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

export default oasisbotHistorySlice;
