import IndicatorInterface from '@interface/IndicatorInterface';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import PresetInterface from '@interface/PresetInterface';

const initPresetData: PresetInterface = {
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
    setPresetData: (state, action: PayloadAction<PresetInterface>) => {
      return action.payload;
    },
    addIndicator: (state, action: PayloadAction<IndicatorInterface>) => {
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
      action: PayloadAction<{id: number; indicator: IndicatorInterface}>,
    ) => {
      state.indicators[action.payload.id] = action.payload.indicator;
      return state;
    },
  },
});

export default presetDataSlice;
