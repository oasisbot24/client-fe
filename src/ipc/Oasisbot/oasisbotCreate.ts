import channel from '@ipc/channel';

const oasisbotCreate = (
  setCoinTable: Function,
  setOasisbotInput: Function,
  setOasisbotState: Function,
  setHistory: Function,
  addHistory: Function,
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

  ipcRenderer.on(channel.oasisbot.status.getstate, (event, res) => {
    setOasisbotState(res);
  });
  ipcRenderer.once(channel.oasisbot.status.getinput, (event, res) => {
    setOasisbotInput(res);
  });
  ipcRenderer.once(channel.oasisbot.status.gethistory, (event, res) => {
    setHistory(res);
  });

  ipcRenderer.on(channel.oasisbot.running, (event, res) => {
    setHistory(prev => {
      let current = [...prev];
      current.unshift(res);
      return current;
    });
  });

  ipcRenderer.send(channel.oasisbot.status.getstate);
  ipcRenderer.send(channel.oasisbot.status.getinput);
  ipcRenderer.send(channel.oasisbot.status.gethistory);
  ipcRenderer.send(channel.api.coin.getticker);
};

export default oasisbotCreate;
