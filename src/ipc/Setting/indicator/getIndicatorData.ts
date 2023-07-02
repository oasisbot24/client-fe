import channel from '@ipc/channel';

const getIndicatorData = (
  getIndicatorData: Function,
  indicatorData: String,
) => {
  const {ipcRenderer} = window.require('electron');

  ipcRenderer.once(channel.setting.indicator.get, (event, res) => {
    if (res != null) {
      getIndicatorData(res);
    }
  });
  ipcRenderer.send(channel.setting.indicator.get, indicatorData);
};

export default getIndicatorData;
