import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initOasisbotState: OasisbotState = {
  isRunning: false,
  account: null,
  profitCutRate: 0,
  lossCutRate: 0,
  state: '',
};

const oasisbotStateSlice = createSlice({
  name: 'oasisbotState',
  initialState: initOasisbotState,
  reducers: {
    setState: (state, action: PayloadAction<OasisbotState>) => {
      return action.payload;
    },
  },
});

export default oasisbotStateSlice;
