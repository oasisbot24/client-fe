import channel from '@ipc/channel';

const sidebarDestroy = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.removeAllListeners(channel.sidebar);
};

export default sidebarDestroy;
