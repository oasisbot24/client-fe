import BacktestProgress from '@interface/BacktestProgress';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initBacktestProcess: BacktestProgress = {
  cache: {
    coin: '',
    date: '',
    progress: 1,
  },
  main: {
    progress: 0,
  },
};

/* Slice */
const backtestProcessSlice = createSlice({
  name: 'backtestProcess',
  initialState: initBacktestProcess,
  reducers: {
    setProgressCache: (
      state,
      action: PayloadAction<BacktestProgress['cache']>,
    ) => {
      state.cache = action.payload;
      return state;
    },
    setProgressMain: (
      state,
      action: PayloadAction<BacktestProgress['main']>,
    ) => {
      state.main = action.payload;
      return state;
    },
  },
});

export default backtestProcessSlice;
