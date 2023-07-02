import channel from '@ipc/channel';

const apiSave = data => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.send(channel.api.keys.save, data);
};

export default apiSave;
