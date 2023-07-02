import {combineReducers} from 'redux';
import presetData from './presetData';
import indicatorData from './indicatorData';

export const actions = {
  setPresetData: presetData.actions.setPresetData,
  setPresetIndicator: presetData.actions.setPresetIndicator,
  addIndicator: presetData.actions.addIndicator,
  deleteIndicator: presetData.actions.deleteIndicator,
  setIndicatorData: indicatorData.actions.setIndicatorData,
  setIndicatorSetting: indicatorData.actions.setIndicatorSetting,
  setWeight: indicatorData.actions.setWeight,
};

export default combineReducers({
  presetData: presetData.reducer,
  indicatorData: indicatorData.reducer,
});
