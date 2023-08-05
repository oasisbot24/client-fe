import channel from '@channel';

const sidebarDestroy = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.removeAllListeners(channel.sidebar);
};

export default sidebarDestroy;
