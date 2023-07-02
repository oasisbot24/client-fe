import TradeHistory from '@interface/TradeHistory';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initHistory: TradeHistory[] = [];

/* Slice */
const oasisbotHistorySlice = createSlice({
  name: 'oasisbotHistory',
  initialState: initHistory,
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

export default oasisbotHistorySlice;
