import channel from '@ipc/channel';

const apiOpen = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.send(channel.api.keys.open);
};

export default apiOpen;
