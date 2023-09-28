import channel from '@channel';

const backtestStop = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.send(channel.backtest.stop);
};

export default backtestStop;
