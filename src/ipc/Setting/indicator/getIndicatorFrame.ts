import channel from '@channel';

const getIndicatorFrame = (
  setIndicatorFrame: Function,
  indicatorName: string,
) => {
  const {ipcRenderer} = window.require('electron');

  ipcRenderer.once(channel.setting.indicator.getFrame, (event, res) => {
    if (res != null) {
      setIndicatorFrame(res);
    }
  });
  ipcRenderer.send(channel.setting.indicator.getFrame, indicatorName);
};

export default getIndicatorFrame;
