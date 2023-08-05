import channel from '@channel';

const updateCreate = (setLog: Function, setProgress: Function) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.on(channel.update.log, (event, res) => {
    setLog(res);
  });
  ipcRenderer.on(channel.update.progress, (event, res) => {
    setProgress(parseFloat(res));
  });
};

export default updateCreate;
