import {combineReducers} from 'redux';
import info from './info';
import bank from './bank';
import file from './file';

export const actions = {
  info: info.actions,
  bank: bank.actions,
  file: file.actions,
};

export default combineReducers({
  info: info.reducer,
  bank: bank.reducer,
  file: file.reducer,
});
