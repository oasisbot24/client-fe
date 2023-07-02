import {combineReducers} from 'redux';
import state from './state';
import input from './input';
import history from './history';
import error from './error';

export const actions = {
  setInput: input.actions.setInput,
  setState: state.actions.setState,
  setHistory: history.actions.setHistory,
  addHistory: history.actions.addHistory,
  setError: error.actions.setError,
};

export default combineReducers({
  input: input.reducer,
  state: state.reducer,
  history: history.reducer,
  error: error.reducer,
});
