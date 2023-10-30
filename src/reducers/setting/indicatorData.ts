import IndicatorInterface from '@interface/IndicatorInterface';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initIndicatorData: IndicatorInterface = {
  title: '',
  setting: {
    coin_type: {name: '', value: ''},
    standard_minute: {name: '', value: ''},
  },
  long_weight: {},
  short_weight: {},
};

const indicatorDataSlice = createSlice({
  name: 'indicatorData',
  initialState: initIndicatorData,
  reducers: {
    setIndicatorData: (state, action: PayloadAction<IndicatorInterface>) => {
      return action.payload;
    },
    setIndicatorSetting: (
      state,
      action: PayloadAction<{name: any; value: any}>,
    ) => {
      if (action.payload.name === 'standard_minute')
        state.setting[action.payload.name].value = parseInt(
          action.payload.value,
        );
      else state.setting[action.payload.name].value = action.payload.value;
      return state;
    },
    setLongWeight: (state, action: PayloadAction<{name: any; value: any}>) => {
      state.long_weight[action.payload.name].value = action.payload.value;
      return state;
    },
    setShortWeight: (state, action: PayloadAction<{name: any; value: any}>) => {
      state.short_weight[action.payload.name].value = action.payload.value;
      return state;
    },
    adjustLongWeight: (
      state,
      action: PayloadAction<{name: any; value: any}>,
    ) => {
      if (
        isNaN(parseInt(action.payload.value)) ||
        parseInt(action.payload.value) < 0
      )
        state.long_weight[action.payload.name].value = 0;
      else if (parseInt(action.payload.value) > 100)
        state.long_weight[action.payload.name].value = 100;
      else
        state.long_weight[action.payload.name].value = parseInt(
          action.payload.value,
        );
      return state;
    },
    adjustShortWeight: (
      state,
      action: PayloadAction<{name: any; value: any}>,
    ) => {
      if (
        isNaN(parseInt(action.payload.value)) ||
        parseInt(action.payload.value) < 0
      )
        state.short_weight[action.payload.name].value = 0;
      else if (parseInt(action.payload.value) > 100)
        state.short_weight[action.payload.name].value = 100;
      else
        state.short_weight[action.payload.name].value = parseInt(
          action.payload.value,
        );
      return state;
    },
  },
});

export default indicatorDataSlice;
