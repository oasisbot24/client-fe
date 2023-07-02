import channel from '@ipc/channel';

const ReduxDestroy = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.removeAllListeners(channel.api.exchange.getname);
};

export default ReduxDestroy;
