import channel from '@ipc/channel';

const coinTableDestory = () => {
  const {ipcRenderer} = window.require('electron');

  ipcRenderer.removeAllListeners(channel.api.coin.gettickerWS);
};

export default coinTableDestory;
