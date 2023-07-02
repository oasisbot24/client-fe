import OasisbotState from '@interface/OasisbotState';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initOasisbotState: OasisbotState = {
  isRunning: false,
  account: null,
  profitCutRate: 0,
  lossCutRate: 0,
  state: '',
};

/* Slice */
const oasisbotStateSlice = createSlice({
  name: 'oasisbotState',
  initialState: initOasisbotState,
  reducers: {
    setState: (state, action: PayloadAction<OasisbotState>) => {
      state = action.payload;
    },
  },
});

export const {setState} = oasisbotStateSlice.actions;
export default oasisbotStateSlice.reducer;
