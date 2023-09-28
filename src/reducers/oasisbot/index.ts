import {combineReducers} from 'redux';
import isRunning from './isRunning';
import input from './input';
import history from './history';
import error from './error';
import wallet from './wallet';
import preset from './preset';

export const actions = {
  setInput: input.actions.setInput,
  setIsRunning: isRunning.actions.setIsRunning,
  setHistory: history.actions.setHistory,
  addHistory: history.actions.addHistory,
  setError: error.actions.setError,
  setWallet: wallet.actions.setWallet,
  setPreset: preset.actions.setPreset,
};

export default combineReducers({
  input: input.reducer,
  isRunning: isRunning.reducer,
  history: history.reducer,
  error: error.reducer,
  wallet: wallet.reducer,
  preset: preset.reducer,
});
