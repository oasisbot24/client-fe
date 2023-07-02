import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initFile: {
  indicatorList: string[];
  presetList: string[];
} = {
  indicatorList: [],
  presetList: [],
};

/* Slice */
const commonFileSlice = createSlice({
  name: 'commonFile',
  initialState: initFile,
  reducers: {
    setIndicatorList: (state, action: PayloadAction<string[]>) => {
      state.indicatorList = action.payload;
      return state;
    },
    setPresetList: (state, action: PayloadAction<string[]>) => {
      state.presetList = action.payload;
      return state;
    },
  },
});

export default commonFileSlice;
