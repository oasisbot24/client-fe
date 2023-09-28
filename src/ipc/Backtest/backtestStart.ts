import channel from '@channel';

const backtestStart = input => {
  const data = {
    preset: input.preset,
    tradeCoin: input.tradeCoin,
    startBalance: parseInt(input.startBalance),
    startDate: input.startDate,
    endDate: input.endDate,
    feeRate: parseFloat(input.feeRate),
  };
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.send(channel.backtest.start, data);
};

export default backtestStart;
