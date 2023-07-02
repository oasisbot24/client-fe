import channel from '@ipc/channel';

const backtestStop = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.send(channel.backtest.stop);
};

export default backtestStop;
