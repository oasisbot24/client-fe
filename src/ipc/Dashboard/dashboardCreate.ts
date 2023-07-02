import channel from '@ipc/channel';

const dashboardCreate = (
  setHistory: Function,
  setPatchnoteContent: Function,
) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.once(channel.dashboard.gethistory, (event, res) => {
    setHistory(res);
  });
  ipcRenderer.once(channel.dashboard.getpatchnote, (event, res) => {
    setPatchnoteContent(res);
  });

  ipcRenderer.send(channel.dashboard.gethistory);
  ipcRenderer.send(channel.dashboard.getpatchnote);
};

export default dashboardCreate;
