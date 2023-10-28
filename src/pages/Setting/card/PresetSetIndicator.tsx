import Label from '@components/Basic/Label';
import IndicatorInterface from '@interface/IndicatorInterface';
import getIndicatorFrame from '@ipc/Setting/indicator/getIndicatorFrame';
import indicatorSubmit from '@ipc/Setting/indicatorSubmit';
import {RootState} from '@reducers/index';
import {actions} from '@reducers/setting/index';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IndicatorDataSetting from './IndicatorDataSetting';

const PresetSetIndicator = () => {
  const {indicatorList, indicatorData} = useSelector((state: RootState) => ({
    indicatorList: state.common.file.indicatorList,
    indicatorData: state.setting.indicatorData,
  }));
  //useEffect(() => {}, []);

  const dispatch = useDispatch();
  const setIndicatorData = (state: IndicatorInterface) =>
    dispatch(actions.setIndicatorData(state));
  const setIndicatorSetting = (state: {name; value}) =>
    dispatch(actions.setIndicatorSetting(state));
  const setWeight = (data: {name; value}) => dispatch(actions.setWeight(data));

  const onChangeTitle = e => {
    const {value, name} = e.target;
    let newIndicator = {...indicatorData};
    newIndicator[name] = value;
    setIndicatorData(newIndicator);
  };

  const onChangeSetting = e => {
    const {value, name} = e.target;
    const indicatorSetting = {
      name: name,
      value: value,
    };
    setIndicatorSetting(indicatorSetting);
  };

  const onChangeWeight = e => {
    const {value, name} = e.target;
    const weightData = {
      name: name,
      value: value,
    };
    setWeight(weightData);
  };

  const onBlurWeight = e => {
    const {value, name} = e.target;
    const weightData = {
      name: name,
      value: value,
    };
    setWeight(weightData);
  };

  const onChangeIndicator = e => {
    getIndicatorFrame(setIndicatorData, e.target.value);
    onChangeTitle(e);
  };

  return (
    <div>
      <form
        className="d-flex-column justify-content-between h-100"
        method="post"
      >
        <div className="d-flex mb-3 h-100">
          <div className="w-33">
            <Label className="mb-3" title="보조지표설정" />
            {Object.keys(indicatorData.setting).map((key, index) => (
              <Label
                className="mb-4"
                key={index}
                title={indicatorData.setting[key].name}
                titleclass="fw-400"
                hasTag
              >
                <IndicatorDataSetting
                  type={key}
                  value={indicatorData.setting[key].value}
                  onChange={onChangeSetting}
                />
              </Label>
            ))}
          </div>
          <div className="hr-vertical"></div>
          <div className="w-33">
            <Label className="mb-3" title="Long 매매비중 (%)" />
            {Object.keys(indicatorData.weight).map((key, index) => (
              <Label
                className="mb-4"
                key={index}
                title={indicatorData.weight[key].name}
                titleclass="fw-400"
                hasTag
              >
                <input
                  name={key}
                  value={indicatorData.weight[key].value}
                  onChange={onChangeWeight}
                  onBlur={onBlurWeight}
                ></input>
              </Label>
            ))}
          </div>
          <div className="hr-vertical"></div>
          <div className="w-33">
            <Label className="mb-3" title="Short 매매비중 (%)" />
            {Object.keys(indicatorData.weight).map((key, index) => (
              <Label
                className="mb-4"
                key={index}
                title={indicatorData.weight[key].name}
                titleclass="fw-400"
                hasTag
              >
                <input
                  name={key}
                  value={indicatorData.weight[key].value}
                  onChange={onChangeWeight}
                  onBlur={onBlurWeight}
                ></input>
              </Label>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PresetSetIndicator;
