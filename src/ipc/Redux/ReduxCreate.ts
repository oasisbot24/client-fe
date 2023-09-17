import channel from '@channel';

const ReduxCreate = (
  setVersion: (version: string) => void,
  setUsdtToKrw: (usdt_to_krw: {date: string; krw: number}) => void,
  setBankname: (bankname: string) => void,
  setCurrency: (currency: string) => void,
  setBalance: (balance: string) => void,
  setPresetList: (presetList: string[]) => void,
  setIndicatorList: (indicatorList: string[]) => void,
) => {
  const {ipcRenderer} = window.require('electron');
  // setInfo
  ipcRenderer.once(channel.version, (event, res) => {
    if (res != null) setVersion(res);
  });
  ipcRenderer.on(channel.api.usdtToKrw.get, (event, res) => {
    if (res != null) setUsdtToKrw(res);
  });

  // setBank
  ipcRenderer.on(channel.api.exchange.getName, (event, res) => {
    setBankname(res);
    if (res === 'upbit') {
      setCurrency('KRW');
    } else if (res === 'lbank') {
      setCurrency('USDT');
    } else if (res === 'okx') {
      setCurrency('USDT');
    }
  });
  ipcRenderer.on(channel.api.account.getBalance, (event, res) => {
    if (res != null) {
      if (isNaN(res)) setBalance(res);
      else setBalance(parseFloat(res).toFixed(2));
    }
  });

  // setFile
  ipcRenderer.on(channel.setting.preset.getList, (event, res) => {
    if (res != null) {
      setPresetList(res as string[]);
    }
  });
  ipcRenderer.on(channel.setting.indicator.getList, (event, res) => {
    if (res != null) {
      let list: string[];
      list = res as string[];
      list.unshift('보조지표 선택');
      setIndicatorList(list);
    }
  });

  ipcRenderer.send(channel.version);
  ipcRenderer.send(channel.api.usdtToKrw.get);
  ipcRenderer.send(channel.api.exchange.getName);
  ipcRenderer.send(channel.api.account.getBalance);
  ipcRenderer.send(channel.setting.preset.getList);
  ipcRenderer.send(channel.setting.indicator.getList);
};

export default ReduxCreate;
