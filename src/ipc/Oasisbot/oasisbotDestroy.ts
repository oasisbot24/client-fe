import channel from '@ipc/channel';

const oasisbotDestroy = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.removeAllListeners(channel.oasisbot.status.getstate);
  ipcRenderer.removeAllListeners(channel.oasisbot.running);
};

export default oasisbotDestroy;
