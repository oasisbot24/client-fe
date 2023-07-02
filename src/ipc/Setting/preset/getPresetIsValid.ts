import channel from '@ipc/channel';

const getPresetIsValid = (presetName: String) => {
  const {ipcRenderer} = window.require('electron');

  return new Promise<boolean>((resolve, reject) => {
    ipcRenderer.once(channel.setting.preset.isvalid, (event, res: boolean) => {
      resolve(res);
    });
    ipcRenderer.send(channel.setting.preset.isvalid, presetName);
  });
};

export default getPresetIsValid;
