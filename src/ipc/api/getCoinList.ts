import channel from '@ipc/channel';

const getCoinList = (callback: Function) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.once(channel.api.coin.getlist, (event, res) => {
    if (res != null) callback(res);
  });
  ipcRenderer.send(channel.api.coin.getlist);
};

export default getCoinList;
