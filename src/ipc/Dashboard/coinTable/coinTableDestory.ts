import channel from '@channel';

const coinTableDestory = () => {
  const {ipcRenderer} = window.require('electron');

  ipcRenderer.removeAllListeners(channel.api.coin.getTickerWS);
};

export default coinTableDestory;
