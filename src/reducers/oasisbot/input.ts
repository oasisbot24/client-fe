import OasisbotInput from '@interface/OasisbotInput';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initOasisbotInput: OasisbotInput = {
  preset: '',
  startAccount: 0,
};

const oasisbotInputSlice = createSlice({
  name: 'oasisbotInput',
  initialState: initOasisbotInput,
  reducers: {
    setInput: (state, action: PayloadAction<OasisbotInput>) => {
      return action.payload;
    },
  },
});

export default oasisbotInputSlice;
