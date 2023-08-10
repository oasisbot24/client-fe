import channel from '@channel';

const oasisbotStart = input => {
  const data = {
    preset: input.preset,
    startCoin: input.startCoin,
    startBalance: parseInt(input.startBalance),
    feeRate: parseFloat(input.feeRate),
  };
  const {ipcRenderer} = window.require('electron');
  console.log('ipc 송신');
  ipcRenderer.send(channel.oasisbot.start, data);
};

export default oasisbotStart;
