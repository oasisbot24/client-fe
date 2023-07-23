import HistoryTrade from '@interface/history/HistoryTrade';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initDashboardHistory: HistoryTrade[] = [];

/* Slice */
const dashboardHistorySlice = createSlice({
  name: 'dashboardHistory',
  initialState: initDashboardHistory,
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

export default dashboardHistorySlice;
