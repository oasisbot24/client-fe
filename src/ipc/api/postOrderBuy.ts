import channel from '@channel';

const postOrderBuy = (data, callback) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.on(channel.oasisbot.buy, (event, res) => {
    callback(res);
  });
  ipcRenderer.send(channel.oasisbot.buy, data);
};

export default postOrderBuy;
