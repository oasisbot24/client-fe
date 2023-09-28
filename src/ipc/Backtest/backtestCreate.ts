import channel from '@channel';
import BacktestProgress from '@interface/BacktestProgress';
import WalletInterface from '@interface/WalletInterface';
import HistoryTrade from '@interface/history/HistoryTrade';
import BacktestInputInterface from '@interface/input/BacktestInputInterface';

const backtestCreate = (
  setBacktestIsRunning: (isRunning: boolean) => void,
  setBacktestWallet: (wallet: WalletInterface) => void,
  setBacktestInput: (input: BacktestInputInterface) => void,
  setHistory: (history: HistoryTrade[]) => void,
  addHistory: (history: HistoryTrade) => void,
  setProgressMain: (cache: BacktestProgress['main']) => void,
  setProgressCache: (cache: BacktestProgress['cache']) => void,
) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.on(channel.backtest.isRunning, (event, res_isRunning) => {
    setBacktestIsRunning(res_isRunning);
  });
  ipcRenderer.once(channel.backtest.getInput, (event, res_getInput) => {
    setBacktestInput(res_getInput);
  });
  ipcRenderer.on(channel.backtest.getHistory, (event, res_getHistory) => {
    setHistory(res_getHistory);
  });
  ipcRenderer.on(channel.backtest.loop, (event, res) => {
    addHistory(res);
  });
  ipcRenderer.on(channel.backtest.progress, (event, res) => {
    setProgressMain({progress: res});
  });
  ipcRenderer.on(channel.cache, (event, res) => {
    setProgressCache(res);
  });

  ipcRenderer.send(channel.backtest.isRunning);
  ipcRenderer.send(channel.backtest.getInput);
  ipcRenderer.send(channel.backtest.getHistory);
};

export default backtestCreate;
