import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initOasisbotIsRunning: {value: boolean} = {value: false};

const oasisbotIsRunningSlice = createSlice({
  name: 'oasisbotIsRunning',
  initialState: initOasisbotIsRunning,
  reducers: {
    setIsRunning: (state, action: PayloadAction<{value: boolean}>) => {
      return action.payload;
    },
  },
});

export default oasisbotIsRunningSlice;
