import channel from '@ipc/channel';

const postOrderSell = (data, callback) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.on(channel.oasisbot.sell, (event, res) => {
    callback(res);
  });
  ipcRenderer.send(channel.oasisbot.sell, data);
};

export default postOrderSell;
