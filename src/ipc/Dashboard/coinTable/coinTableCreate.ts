import channel from '@channel';

const cointTableCreate = (
  setCoinNameList: Function,
  setCoinTable: Function,
) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.on(channel.api.coin.getTickerWS, (event, res) => {
    setCoinTable(prev => {
      let current = {...prev};
      res.market = res.code;
      current[res.code] = res;
      return current;
    });
  });
  ipcRenderer.once(channel.api.coin.getTicker, (event, res) => {
    if (res != null) {
      let coinTable = {};
      for (const cell of res) {
        coinTable[cell.market] = cell;
      }
      setCoinTable(coinTable);
    }
  });
  ipcRenderer.once(channel.api.coin.getList, (event, res) => {
    if (res != null) {
      setCoinNameList(res);
    }
  });
  ipcRenderer.send(channel.api.coin.getTicker);
  ipcRenderer.send(channel.api.coin.getList);
};

export default cointTableCreate;
