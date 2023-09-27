import channel from '@channel';
import ApiKeys from '@interface/ApiKeys';

const apiGet = async (
  setAccessKey: Function,
  setSecretKey: Function,
  setPassPhrase: Function,
) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.once(channel.api.keys.get, (event, res: ApiKeys) => {
    console.log(res);
    setAccessKey(res.accessKey);
    setSecretKey(res.secretKey);
    if (res.passphrase) setPassPhrase(res?.passphrase);
  });
  ipcRenderer.send(channel.api.keys.get);
};

export default apiGet;
