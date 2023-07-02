import channel from '@ipc/channel';

const backtestCreate = (
  setBacktestState: Function,
  setBacktestInput: Function,
  setHistory: Function,
  addHistory: Function,
  setProgressCache: Function,
  setProgressMain: Function,
) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.on(channel.backtest.status.getstate, (event, res) => {
    setBacktestState(res);
  });
  ipcRenderer.once(channel.backtest.status.getinput, (event, res_getinput) => {
    setBacktestInput(res_getinput);
  });
  ipcRenderer.on(
    channel.backtest.status.gethistory,
    (event, res_gethistory) => {
      setHistory(res_gethistory);
    },
  );

  ipcRenderer.on(channel.backtest.running, (event, res) => {
    addHistory(res);
  });

  ipcRenderer.on(channel.backtest.progress, (event, res) => {
    setProgressMain({progress: res});
  });

  ipcRenderer.on(channel.cache, (event, res) => {
    setProgressCache(res);
  });

  ipcRenderer.send(channel.backtest.status.getstate);
  ipcRenderer.send(channel.backtest.status.getinput);
  ipcRenderer.send(channel.backtest.status.gethistory);
};

export default backtestCreate;
