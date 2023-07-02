import TradeHistory from '@interface/TradeHistory';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initDashboardHistory: TradeHistory[] = [];

/* Slice */
const dashboardHistorySlice = createSlice({
  name: 'dashboardHistory',
  initialState: initDashboardHistory,
  reducers: {
    addHistory: (state, action: PayloadAction<TradeHistory>) => {
      state.unshift(action.payload);
      return state;
    },
    setHistory: (state, action: PayloadAction<TradeHistory[]>) => {
      return action.payload;
    },
  },
});

export default dashboardHistorySlice;
