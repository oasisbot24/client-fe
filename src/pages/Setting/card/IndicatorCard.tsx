import React, {useEffect} from 'react';
import Label from '@components/Basic/Label';
import getIndicatorFrame from '@ipc/Setting/indicator/getIndicatorFrame';
import IndicatorDataSetting from './IndicatorDataSetting';
import ParentIndicator_Data from '@interface/ParentIndicator_Data';
import indicatorSubmit from '@ipc/Setting/indicatorSubmit';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reducers/index';
import {actions} from '@reducers/setting/index';

interface Props {
  isUpdate: boolean;
  setIsUpdate: Function;
}

const IndicatorCard: React.FC<Props> = ({isUpdate, setIsUpdate}) => {
  const {indicatorList, indicatorData} = useSelector((state: RootState) => ({
    indicatorList: state.common.file.indicatorList,
    indicatorData: state.setting.indicatorData,
  }));
  //useEffect(() => {}, []);

  const dispatch = useDispatch();
  const setIndicatorData = (state: ParentIndicator_Data) =>
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
    <div className="IndicatorCard card h-100">
      <form
        className="d-flex-column justify-content-between h-100"
        method="post"
        onSubmit={e => indicatorSubmit(e, setIsUpdate)}
      >
        <Label title="보조지표 목록" titleclass="fs-3 fw-600" hasTag>
          <select
            name="title"
            value={indicatorData.title}
            onChange={onChangeIndicator}
          >
            {indicatorList.map((indicator, index) => (
              <option key={index} value={indicator}>
                {indicator}
              </option>
            ))}
          </select>
        </Label>
        <hr />

        <div className="d-flex mb-3 h-100">
          <div className="w-50">
            <Label className="mb-3" title="기본설정" />
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
          <div className="w-50">
            <Label className="mb-3" title="매매비중 (%)" />
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
        <button
          className={
            'w-100 btn-contained-blue ' + (isUpdate === true ? '' : 'd-none')
          }
        >
          <p> 보조지표 저장 </p>
        </button>
      </form>
    </div>
  );
};

export default IndicatorCard;
