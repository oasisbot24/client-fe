import Preset from '@interface/Preset';
import ParentIndicator_Data from '@interface/ParentIndicator_Data';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initPresetData: Preset = {
  name: '',
  coin_type: '',
  indicators: [],
  profitCutRate: 0,
  lossCutRate: 0,
  isError: false,
};

const presetDataSlice = createSlice({
  name: 'presetData',
  initialState: initPresetData,
  reducers: {
    setPresetData: (state, action: PayloadAction<Preset>) => {
      return action.payload;
    },
    addIndicator: (state, action: PayloadAction<ParentIndicator_Data>) => {
      console.log(action.payload);
      state.indicators.unshift(action.payload);
      console.log('add complete');
      return state;
    },
    deleteIndicator: (state, action: PayloadAction<number>) => {
      state.indicators.splice(action.payload, 1);
      return state;
    },
    setPresetIndicator: (
      state,
      action: PayloadAction<{id: number; indicator: ParentIndicator_Data}>,
    ) => {
      state.indicators[action.payload.id] = action.payload.indicator;
      return state;
    },
  },
});

export default presetDataSlice;
