import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initDashboardPatchnote: string = '';

/* Slice */
const backtestInputSlice = createSlice({
  name: 'dashboardPatchnote',
  initialState: initDashboardPatchnote,
  reducers: {
    setPatchnote: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default backtestInputSlice;
