import Label from '@components/Basic/Label';
import IndicatorInterface from '@interface/IndicatorInterface';
import PresetInterface from '@interface/PresetInterface';
import CoinName from '@interface/api/coin/CoinName';
import presetSubmit from '@ipc/Setting/presetSubmit';
import getCoinList from '@ipc/api/getCoinList';
import PresetSetIndicator from '@pages/Setting/card/PresetSetIndicator';
import PresetSetInfo from '@pages/Setting/card/PresetSetInfo';
import PresetSetPL from '@pages/Setting/card/PresetSetPL';
import {RootState} from '@reducers/index';
import {actions} from '@reducers/setting/index';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

interface Props {
  isUpdate: boolean;
  setIsUpdate: Function;
}

const PresetCard: React.FC<Props> = ({isUpdate, setIsUpdate}) => {
  const {presetData, indicatorData} = useSelector((state: RootState) => ({
    presetData: state.setting.presetData,
    indicatorData: state.setting.indicatorData,
  }));

  const dispatch = useDispatch();
  const setPresetData = (preset: PresetInterface) =>
    dispatch(actions.setPresetData(preset));
  const addIndicator = (indicator: IndicatorInterface) =>
    dispatch(actions.addIndicator(indicator));
  const deleteIndicator = (id: number) => dispatch(actions.deleteIndicator(id));
  const setPresetIndicator = (data: {
    id: number;
    indicator: IndicatorInterface;
  }) => dispatch(actions.setPresetIndicator(data));
  const setIndicatorData = (state: IndicatorInterface) =>
    dispatch(actions.setIndicatorData(state));
  const [indicatorId, setIndicatorId] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (indicatorId !== -1) {
      const data = {
        id: indicatorId,
        indicator: indicatorData,
      };
      setPresetIndicator(data);
      if (isUpdate === false) setIndicatorId(-1);
    }
  }, [indicatorData, isUpdate]);

  const onChangePresetData = e => {
    const {value, name} = e.target;
    let newPreset = {...presetData};
    newPreset[name] = value;
    setPresetData(newPreset);
  };

  return (
    <div className="PresetCard card">
      <form
        method="post"
        onSubmit={e => presetSubmit(e, presetData, setSubmitted, setError)}
      >
        <Label title="프리셋 이름" hasTag>
          <input
            name="name"
            value={presetData.name}
            onChange={onChangePresetData}
          />
        </Label>
        <hr />
        <div className="d-flex">
          <div className="w-50">
            <PresetSetInfo />
          </div>
          <div className="hr-vertical"></div>
          <div className="w-50">
            <PresetSetPL error={error} />
          </div>
        </div>
        <hr />
        <PresetSetIndicator />

        {submitted === false ? (
          <button className="w-100 btn-contained-darkblue">
            <p> 프리셋 저장 </p>
          </button>
        ) : (
          <div className="w-100 btn bg-gray-300 text-white">
            <p> 저장되었습니다 </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default PresetCard;
