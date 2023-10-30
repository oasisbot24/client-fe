import Label from '@components/Basic/Label';
import IndicatorInterface from '@interface/IndicatorInterface';
import PresetInterface from '@interface/PresetInterface';
import CoinName from '@interface/api/coin/CoinName';
import getIndicatorFrame from '@ipc/Setting/indicator/getIndicatorFrame';
import getCoinList from '@ipc/api/getCoinList';
import {RootState} from '@reducers/index';
import {actions} from '@reducers/setting/index';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function PresetSetInfo() {
  const {presetData, indicatorList, indicatorData} = useSelector(
    (state: RootState) => ({
      presetData: state.setting.presetData,
      indicatorList: state.common.file.indicatorList,
      indicatorData: state.setting.indicatorData,
    }),
  );

  const dispatch = useDispatch();
  const setPresetData = (preset: PresetInterface) =>
    dispatch(actions.setPresetData(preset));
  const setIndicatorData = (state: IndicatorInterface) =>
    dispatch(actions.setIndicatorData(state));

  const [coinList, setCoinList] = useState<CoinName[]>([]);
  useEffect(() => {
    getCoinList((data: CoinName[]) => {
      let unshiftCoinList = [...data];
      unshiftCoinList.unshift({
        market: 'select',
        korean_name: '코인 선택',
        english_name: 'select',
      });
      setCoinList(unshiftCoinList);
    });
  }, []);

  useEffect(() => {
    if (coinList.length > 0) {
      let newPreset = {...presetData};
      if (newPreset.coin_type === '') newPreset.coin_type = coinList[0].market;
      setPresetData(newPreset);
    }
  }, [coinList]);

  const onChangePresetData = e => {
    const {value, name} = e.target;
    let newPreset = {...presetData};
    newPreset[name] = value;

    setPresetData(newPreset);
  };

  const onChangeIndicator = e => {
    const {value, name} = e.target;
    getIndicatorFrame(setIndicatorData, value);
    let newIndicator = {...indicatorData};
    newIndicator[name] = value;
    setIndicatorData(newIndicator);
    let newPresetData = {...presetData};
    newPresetData.indicators = [];
    newPresetData.indicators.push(newIndicator);
    setPresetData(newPresetData);
  };

  return (
    <>
      <Label title="매매코인" hasTag>
        <select
          name="coin_type"
          value={presetData.coin_type}
          onChange={onChangePresetData}
        >
          {coinList.map((coin, index) => (
            <option key={index} value={coin.market}>
              {coin.korean_name}
            </option>
          ))}
        </select>
      </Label>
      <hr />
      <Label title="보조지표" hasTag>
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
    </>
  );
}
