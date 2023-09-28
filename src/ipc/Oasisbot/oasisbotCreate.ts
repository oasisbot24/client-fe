import channel from '@channel';
import WalletInterface from '@interface/WalletInterface';
import CoinTickerAxios from '@interface/api/coin/CoinTickerAxios';
import HistoryTrade from '@interface/history/HistoryTrade';
import OasisbotInputInterface from '@interface/input/OasisbotInputInterface';

const oasisbotCreate = (
  setOasisbotIsRunning: (isRunning: boolean) => void,
  setOasisbotWallet: (wallet: WalletInterface) => void,
  setOasisbotInput: (input: OasisbotInputInterface) => void,
  setHistory: (history: HistoryTrade[]) => void,
  addHistory: (history: HistoryTrade) => void,
  setCoinTable: React.Dispatch<
    React.SetStateAction<{
      [key: string]: CoinTickerAxios;
    }>
  >,
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
    addHistory(res);
  });

  ipcRenderer.on(channel.oasisbot.wallet, (event, res) => {
    setOasisbotWallet(res);
  })

  ipcRenderer.send(channel.oasisbot.isRunning);
  ipcRenderer.send(channel.oasisbot.getInput);
  ipcRenderer.send(channel.oasisbot.getHistory);
  ipcRenderer.send(channel.api.coin.getTicker);
};

export default oasisbotCreate;
