import OasisbotInputInterface from '@interface/input/OasisbotInputInterface';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initOasisbotInput: OasisbotInputInterface = {
  preset: '',
  startAccount: 0,
};

const oasisbotInputSlice = createSlice({
  name: 'oasisbotInput',
  initialState: initOasisbotInput,
  reducers: {
    setInput: (state, action: PayloadAction<OasisbotInputInterface>) => {
      return action.payload;
    },
  },
});

export default oasisbotInputSlice;
