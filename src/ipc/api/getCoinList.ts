import channel from '@channel';

const getCoinList = (callback: Function) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.once(channel.api.coin.getList, (event, res) => {
    if (res != null) callback(res);
  });
  ipcRenderer.send(channel.api.coin.getList);
};

export default getCoinList;
