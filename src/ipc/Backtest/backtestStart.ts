import channel from '@channel';

const backtestStart = input => {
  const data = {
    preset: input.preset,
    startAccount: parseInt(input.startAccount),
    startDate: input.startDate,
    endDate: input.endDate,
    feeRate: parseFloat(input.feeRate),
  };
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.send(channel.backtest.start, data);
};

export default backtestStart;
