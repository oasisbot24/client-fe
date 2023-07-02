import {combineReducers} from 'redux';
import state from './state';
import input from './input';
import history from './history';
import progress from './progress';

export const actions = {
  setInput: input.actions.setInput,
  setState: state.actions.setState,
  setHistory: history.actions.setHistory,
  addHistory: history.actions.addHistory,
  setProgressCache: progress.actions.setProgressCache,
  setProgressMain: progress.actions.setProgressMain,
};

export default combineReducers({
  input: input.reducer,
  state: state.reducer,
  history: history.reducer,
  progress: progress.reducer,
});
