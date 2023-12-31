import PresetInterface from '@interface/PresetInterface';
import channel from '@channel';

const savePreset = (presetData: PresetInterface) => {
  const filename = presetData.name;
  let current: PresetInterface = JSON.parse(JSON.stringify(presetData));
  console.log(current);

  current.profitCutRate = current.profitCutRate / 100;
  current.lossCutRate = current.lossCutRate / 100;
  for (let i = 0; i < current.indicators.length; i++) {
    Object.keys(current.indicators[i].long_weight).map((key, index) => {
      return (current.indicators[i].long_weight[key].value =
        current.indicators[i].long_weight[key].value / 100);
    });
    Object.keys(current.indicators[i].short_weight).map((key, index) => {
      return (current.indicators[i].short_weight[key].value =
        current.indicators[i].short_weight[key].value / 100);
    });
  }
  const data = {
    filename: filename,
    json: current,
  };
  const {ipcRenderer} = window.require('electron');
  //console.log(data);
  ipcRenderer.send(channel.setting.preset.save, data);
  return true;
};

export default savePreset;
