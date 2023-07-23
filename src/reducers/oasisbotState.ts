import {PayloadAction, createSlice} from '@reduxjs/toolkit';

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
