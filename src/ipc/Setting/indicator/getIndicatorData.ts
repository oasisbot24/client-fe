import channel from '@channel';
import IndicatorInterface, {
  InitialIndicatorInterface,
} from '@interface/IndicatorInterface';

const getIndicatorData = (
  setIndicatorData: (indicator: IndicatorInterface) => void,
  indicatorData: String,
) => {
  const {ipcRenderer} = window.require('electron');

  ipcRenderer.once(
    channel.setting.indicator.get,
    (event, res: IndicatorInterface | null) => {
      if (res != null) {
        setIndicatorData(res);
      } else {
        setIndicatorData(InitialIndicatorInterface);
      }
    },
  );
  ipcRenderer.send(channel.setting.indicator.get, indicatorData);
};

export default getIndicatorData;
