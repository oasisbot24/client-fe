import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initOasisbotIsRunning: boolean = false;

const oasisbotIsRunningSlice = createSlice({
  name: 'oasisbotIsRunning',
  initialState: initOasisbotIsRunning,
  reducers: {
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default oasisbotIsRunningSlice;
