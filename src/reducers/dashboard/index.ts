import {combineReducers} from 'redux';
import patchnote from './patchnote';
import history from './history';

export const actions = {
  history: history.actions,
  patchnote: patchnote.actions,
};

export default combineReducers({
  history: history.reducer,
  patchnote: patchnote.reducer,
});
