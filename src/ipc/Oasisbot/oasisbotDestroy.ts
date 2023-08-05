import channel from '@channel';

const oasisbotDestroy = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.removeAllListeners(channel.oasisbot.isRunning);
  ipcRenderer.removeAllListeners(channel.oasisbot.loop);
};

export default oasisbotDestroy;
