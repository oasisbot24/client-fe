import Label from '@components/Basic/Label';
import {RootState} from '@reducers/index';
import {actions} from '@reducers/setting/index';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IndicatorDataSetting from './IndicatorDataSetting';

const PresetSetIndicator = () => {
  const {indicatorData} = useSelector((state: RootState) => ({
    indicatorData: state.setting.indicatorData,
  }));
  //useEffect(() => {}, []);

  const dispatch = useDispatch();
  const setIndicatorSetting = (state: {name; value}) =>
    dispatch(actions.setIndicatorSetting(state));
  const setLongWeight = (data: {name; value}) =>
    dispatch(actions.setLongWeight(data));
  const setShortWeight = (data: {name; value}) =>
    dispatch(actions.setShortWeight(data));

  const onChangeSetting = e => {
    const {value, name} = e.target;
    const indicatorSetting = {
      name: name,
      value: value,
    };
    setIndicatorSetting(indicatorSetting);
  };

  const onChangeLongWeight = e => {
    const {value, name} = e.target;
    const weightData = {
      name: name,
      value: value,
    };
    setLongWeight(weightData);
  };

  const onChangeShortWeight = e => {
    const {value, name} = e.target;
    const weightData = {
      name: name,
      value: value,
    };
    setShortWeight(weightData);
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
            {Object.keys(indicatorData.long_weight).map((key, index) => (
              <Label
                className="mb-4"
                key={index}
                title={indicatorData.long_weight[key].name}
                titleclass="fw-400"
                hasTag
              >
                <input
                  name={key}
                  value={indicatorData.long_weight[key].value}
                  onChange={onChangeLongWeight}
                  onBlur={onChangeLongWeight}
                ></input>
              </Label>
            ))}
          </div>
          <div className="hr-vertical"></div>
          <div className="w-33">
            <Label className="mb-3" title="Short 매매비중 (%)" />
            {Object.keys(indicatorData.short_weight).map((key, index) => (
              <Label
                className="mb-4"
                key={index}
                title={indicatorData.short_weight[key].name}
                titleclass="fw-400"
                hasTag
              >
                <input
                  name={key}
                  value={indicatorData.short_weight[key].value}
                  onChange={onChangeShortWeight}
                  onBlur={onChangeShortWeight}
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
