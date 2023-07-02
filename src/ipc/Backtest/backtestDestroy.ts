import channel from '@ipc/channel';

const backtestDestroy = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.removeAllListeners(channel.backtest.status.getstate);
  ipcRenderer.removeAllListeners(channel.backtest.status.gethistory);
  ipcRenderer.removeAllListeners(channel.backtest.running);
  ipcRenderer.removeAllListeners(channel.backtest.progress);
  ipcRenderer.removeAllListeners(channel.cache);
};

export default backtestDestroy;
