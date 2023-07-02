import channel from '@ipc/channel';

const getIndicatorFrame = (
  setIndicatorFrame: Function,
  indicatorName: string,
) => {
  const {ipcRenderer} = window.require('electron');

  ipcRenderer.once(channel.setting.indicator.getframe, (event, res) => {
    if (res != null) {
      setIndicatorFrame(res);
    }
  });
  ipcRenderer.send(channel.setting.indicator.getframe, indicatorName);
};

export default getIndicatorFrame;
