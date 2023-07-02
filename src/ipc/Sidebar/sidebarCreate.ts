import channel from '@ipc/channel';

const sidebarCreate = (setSidebarState: Function) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.on(channel.sidebar, (event, res) => {
    setSidebarState(res);
  });

  ipcRenderer.send(channel.sidebar);
};

export default sidebarCreate;
