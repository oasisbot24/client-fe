import channel from '@ipc/channel';

const cointTableCreate = (
  setCoinNameList: Function,
  setCoinTable: Function,
) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.on(channel.api.coin.gettickerWS, (event, res) => {
    setCoinTable(prev => {
      let current = {...prev};
      res.market = res.code;
      current[res.code] = res;
      return current;
    });
  });
  ipcRenderer.once(channel.api.coin.getticker, (event, res) => {
    if (res != null) {
      let coinTable = {};
      for (const cell of res) {
        coinTable[cell.market] = cell;
      }
      setCoinTable(coinTable);
    }
  });
  ipcRenderer.once(channel.api.coin.getlist, (event, res) => {
    if (res != null) {
      setCoinNameList(res);
    }
  });
  ipcRenderer.send(channel.api.coin.getticker);
  ipcRenderer.send(channel.api.coin.getlist);
};

export default cointTableCreate;
