import channel from '@ipc/channel';
import Preset from '@interface/Preset';

const getPresetData = (setPresetData: Function, presetName: String) => {
  const {ipcRenderer} = window.require('electron');

  if (presetName === undefined) return;
  ipcRenderer.once(channel.setting.preset.get, (event, res: Preset | null) => {
    if (res != null) {
      res.profitCutRate *= 100;
      res.lossCutRate *= 100;
      for (let i = 0; i < res.indicators.length; i++) {
        Object.keys(res.indicators[i].weight).map((key, index) => {
          return (res.indicators[i].weight[key].value *= 100);
        });
      }
      setPresetData(res);
    } else {
      setPresetData(prev => {
        let current = {...prev};
        current.isError = true;
        return current;
      });
    }
  });
  ipcRenderer.send(channel.setting.preset.get, presetName);
};

export default getPresetData;
