import channel from '@channel';

const oasisbotError = (setError: Function) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.on(channel.oasisbot.error, (event, res) => {
    setError(res);
  });
};

export default oasisbotError;
