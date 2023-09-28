import channel from '@channel';

const backtestDestroy = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.removeAllListeners(channel.backtest.isRunning);
  ipcRenderer.removeAllListeners(channel.backtest.getInput);
  ipcRenderer.removeAllListeners(channel.backtest.getHistory);
  ipcRenderer.removeAllListeners(channel.backtest.loop);
  ipcRenderer.removeAllListeners(channel.backtest.progress);
  ipcRenderer.removeAllListeners(channel.cache);
};

export default backtestDestroy;
