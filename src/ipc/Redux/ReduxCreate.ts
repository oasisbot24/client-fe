import {UserType} from '@interface/api/backend/user';
import channel from '@ipc/channel';

const ReduxCreate = (
  setVersion: (version: string) => void,
  setUsdtToKrw: (usdt_to_krw: {date: string; krw: number}) => void,
  setBankname: (bankname: string) => void,
  setCurrency: (currency: string) => void,
  setBalance: (balance: string) => void,
  setUser: (user: UserType) => void,
  setPresetList: (presetList: string[]) => void,
  setIndicatorList: (indicatorList: string[]) => void,
) => {
  const {ipcRenderer} = window.require('electron');
  // setInfo
  ipcRenderer.once(channel.version, (event, res) => {
    if (res != null) setVersion(res);
  });
  ipcRenderer.on(channel.account.usdt_to_krw.get, (event, res) => {
    if (res != null) setUsdtToKrw(res);
  });

  // setBank
  ipcRenderer.on(channel.api.exchange.getname, (event, res) => {
    setBankname(res);
    if (res === 'upbit') {
      setCurrency('KRW');
    } else if (res === 'lbank') {
      setCurrency('USDT');
    }
  });
  ipcRenderer.on(channel.api.account.get, (event, res) => {
    if (res != null) {
      if (isNaN(res)) setBalance(res);
      else setBalance(parseFloat(res).toFixed(2));
    }
  });

  // setUser
  ipcRenderer.on(channel.account.user.get, (event, res) => {
    if (res != null) {
      setUser(res as UserType);
    }
  });

  // setFile
  ipcRenderer.on(channel.setting.preset.getlist, (event, res) => {
    if (res != null) {
      setPresetList(res as string[]);
    }
  });
  ipcRenderer.on(channel.setting.indicator.getlist, (event, res) => {
    if (res != null) {
      let list: string[];
      list = res as string[];
      list.unshift('보조지표 선택');
      setIndicatorList(list);
    }
  });

  ipcRenderer.send(channel.version);
  ipcRenderer.send(channel.account.usdt_to_krw.get);
  ipcRenderer.send(channel.api.exchange.getname);
  ipcRenderer.send(channel.api.account.get);
  ipcRenderer.send(channel.account.user.get);
  ipcRenderer.send(channel.setting.preset.getlist);
  ipcRenderer.send(channel.setting.indicator.getlist);
};

export default ReduxCreate;
