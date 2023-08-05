import channel from '@channel';

const dashboardCreate = (
  setHistory: Function,
  setPatchnoteContent: Function,
) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.once(channel.dashboard.getHistory, (event, res) => {
    setHistory(res);
  });
  ipcRenderer.once(channel.dashboard.getPatchnote, (event, res) => {
    setPatchnoteContent(res);
  });

  ipcRenderer.send(channel.dashboard.getHistory);
  ipcRenderer.send(channel.dashboard.getPatchnote);
};

export default dashboardCreate;
