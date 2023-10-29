import channel from '@channel';
import PresetInterface, {
  InitialPresetInterface,
} from '@interface/PresetInterface';

const getPresetData = (setPresetData: Function, presetName: String) => {
  const {ipcRenderer} = window.require('electron');

  if (presetName === undefined) return;
  if (presetName === '') return;
  if (presetName === '프리셋 선택') return;

  ipcRenderer.once(
    channel.setting.preset.get,
    (event, res: PresetInterface | null) => {
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
        setPresetData(InitialPresetInterface);
      }
    },
  );
  ipcRenderer.send(channel.setting.preset.get, presetName);
};

export default getPresetData;
