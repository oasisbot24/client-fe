import channel from '@channel';

const backtestCreate = (
  setBacktestIsRunning: Function,
  setBacktestInput: Function,
  setHistory: Function,
  addHistory: Function,
  setProgressCache: Function,
  setProgressMain: Function,
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
