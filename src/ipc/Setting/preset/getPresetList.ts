import channel from '@channel';

const getPresetList = (setPresetList: Function, callback?: Function) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.once(channel.setting.preset.getList, (event, res) => {
    if (res != null) {
      setPresetList(res);
      if (callback != null) callback(res);
    }
  });
  ipcRenderer.send(channel.setting.preset.getList);
};

export default getPresetList;
