import channel from '@channel';

const getPresetIsValid = (presetName: String) => {
  const {ipcRenderer} = window.require('electron');

  return new Promise<boolean>((resolve, reject) => {
    ipcRenderer.once(channel.setting.preset.isValid, (event, res: boolean) => {
      resolve(res);
    });
    ipcRenderer.send(channel.setting.preset.isValid, presetName);
  });
};

export default getPresetIsValid;
