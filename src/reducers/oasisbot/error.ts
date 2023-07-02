import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initOasisbotError = {
  preset: '',
  startAccount: '',
  oasisbot: '',
};

const oasisbotErrorSlice = createSlice({
  name: 'oasisbotErroe',
  initialState: initOasisbotError,
  reducers: {
    setError: (state, action: PayloadAction) => {
      return action.payload;
    },
  },
});

export default oasisbotErrorSlice;
