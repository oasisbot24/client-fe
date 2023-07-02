import {combineReducers} from 'redux';
import info from './info';
import bank from './bank';
import file from './file';
import user from './user';

export const actions = {
  info: info.actions,
  bank: bank.actions,
  file: file.actions,
  user: user.actions,
};

export default combineReducers({
  info: info.reducer,
  bank: bank.reducer,
  file: file.reducer,
  user: user.reducer,
});
