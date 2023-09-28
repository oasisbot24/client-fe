import channel from '@channel';

const ReduxDestroy = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.removeAllListeners(channel.api.exchange.getName);
};

export default ReduxDestroy;
