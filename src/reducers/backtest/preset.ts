import PresetInterface from '@interface/PresetInterface';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initPreset: PresetInterface = {
  name: '',
  coin_type: '',
  indicators: [],
  profitCutRate: 0,
  lossCutRate: 0,
  isError: false,
};

const backtestPresetSlice = createSlice({
  name: 'backtestPreset',
  initialState: initPreset,
  reducers: {
    setPreset: (state, action: PayloadAction<PresetInterface>) => {
      return action.payload;
    },
  },
});

export default backtestPresetSlice;
