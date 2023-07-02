import channel from '@ipc/channel';

const apiGet = async (setAccessKey: Function, setSecretKey: Function) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.once(channel.api.keys.get, (event, res) => {
    setAccessKey(res.accessKey);
    setSecretKey(res.secretKey);
  });
  ipcRenderer.send(channel.api.keys.get);
};

export default apiGet;
