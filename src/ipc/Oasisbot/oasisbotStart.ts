import channel from '@channel';
import OasisbotInputInterface from '@interface/input/OasisbotInputInterface';

const oasisbotStart = (input: OasisbotInputInterface) => {
  const data = {
    preset: input.preset,
    tradeCoin: input.tradeCoin,
    longStartBalance: input.longStartBalance,
    shortStartBalance: input.shortStartBalance,
  };
  const {ipcRenderer} = window.require('electron');
  console.log('ipc 송신');
  ipcRenderer.send(channel.oasisbot.start, data);
};

export default oasisbotStart;
