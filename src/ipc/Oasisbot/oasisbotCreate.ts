import channel from '@channel';

const oasisbotCreate = (
  setCoinTable: Function,
  setOasisbotInput: Function,
  setOasisbotIsRunning: Function,
  setHistory: Function,
  addHistory: Function,
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

  ipcRenderer.on(channel.oasisbot.isRunning, (event, res) => {
    setOasisbotIsRunning(res);
  });
  ipcRenderer.once(channel.oasisbot.getInput, (event, res) => {
    setOasisbotInput(res);
  });
  ipcRenderer.once(channel.oasisbot.getHistory, (event, res) => {
    setHistory(res);
  });

  ipcRenderer.on(channel.oasisbot.loop, (event, res) => {
    setHistory(prev => {
      let current = [...prev];
      current.unshift(res);
      return current;
    });
  });

  ipcRenderer.send(channel.oasisbot.isRunning);
  ipcRenderer.send(channel.oasisbot.getInput);
  ipcRenderer.send(channel.oasisbot.getHistory);
  ipcRenderer.send(channel.api.coin.getTicker);
};

export default oasisbotCreate;
