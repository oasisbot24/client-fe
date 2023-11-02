import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface OasisbotError {
  preset: string;
  startBalance: string;
  oasisbot: string;
}

const initOasisbotError: OasisbotError = {
  preset: '',
  startBalance: '',
  oasisbot: '',
};

const oasisbotErrorSlice = createSlice({
  name: 'oasisbotError',
  initialState: initOasisbotError,
  reducers: {
    setError: (state, action: PayloadAction<OasisbotError>) => {
      return action.payload;
    },
  },
});

export default oasisbotErrorSlice;
export {OasisbotError};
