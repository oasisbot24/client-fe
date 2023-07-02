import channel from '@ipc/channel';

const oasisbotStop = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.send(channel.oasisbot.stop);
};

export default oasisbotStop;
