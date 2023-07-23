import React, {useState, useEffect} from 'react';
import {RootState} from '@reducers/index';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '@reducers/setting/index';
import Icon from '@components/Basic/Icon';
import Label from '@components/Basic/Label';
import getCoinList from '@ipc/api/getCoinList';
import presetSubmit from '@ipc/Setting/presetSubmit';
import IndicatorInterface from '@interface/IndicatorInterface';
import Error from '@components/Basic/Error';
import CoinName from '@interface/api/coin/CoinName';
import getDefaultIndicator from '@function/getDefaultIndicator';
import PresetInterface from '@interface/PresetInterface';

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

  const [coinList, setCoinList] = useState<CoinName[]>([]);
  const [indicatorId, setIndicatorId] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCoinList((res: CoinName[]) => {
      setCoinList([...res]);
    });
  }, []);

  useEffect(() => {
    if (coinList.length > 0) {
      let newPreset = {...presetData};
      if (newPreset.coin_type === '') newPreset.coin_type = coinList[0].market;
      setPresetData(newPreset);
    }
  }, [coinList]);

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

  const onBlur = e => {
    const {value, name} = e.target;
    if (name === 'profitCutRate' || name === 'lossCutRate') {
      let newPreset = {...presetData};
      if (isNaN(parseFloat(value))) newPreset[name] = 0;
      else if (name === 'profitCutRate' && parseFloat(value) < 0)
        newPreset[name] = 0;
      else if (name === 'lossCutRate' && parseFloat(value) > 0)
        newPreset[name] = 0;
      else newPreset[name] = parseFloat(value);
      setPresetData(newPreset);
    }
  };

  const indicatorCreate = e => {
    const indicator: IndicatorInterface = getDefaultIndicator();

    setIndicatorId(presetData.indicators.length);
    setIsUpdate(true);
    setIndicatorData(indicator);

    console.log('add indicator');
    console.log(presetData.indicators.length);

    addIndicator(indicator);
  };

  const indicatorUpdate = e => {
    const id = parseInt(e.currentTarget.id);
    setIndicatorId(id);
    setIsUpdate(true);
    setIndicatorData(presetData.indicators[id]);
  };

  const indicatorDelete = e => {
    const id: number = parseInt(e.currentTarget.id);

    deleteIndicator(id);

    setIsUpdate(false);
    setIndicatorId(-1);
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
          ></input>
        </Label>
        <hr />
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
        <div>
          <Label className="mb-3" title="보조지표" hasTag>
            <button
              type="button"
              className={'btn-round'}
              onClick={indicatorCreate}
            >
              <p> + </p>
            </button>
          </Label>

          {presetData.indicators.map((indicator, index) => (
            <Label
              key={index.toString()}
              className="mb-4"
              title={indicator.title}
              titleclass="fw-400"
              hasTag
            >
              <div className="d-flex">
                <button
                  id={index.toString()}
                  type="button"
                  className={
                    'btn-icon-blue-300 w-50 me-5 ' +
                    (index === indicatorId ? 'active' : '')
                  }
                  onClick={indicatorUpdate}
                >
                  <Icon src="icon/edit.svg" />
                </button>

                <button
                  id={index.toString()}
                  type="button"
                  className="btn-icon-red w-50 ms-5"
                  onClick={indicatorDelete}
                >
                  <Icon src="icon/delete.svg" />
                </button>
              </div>
            </Label>
          ))}
        </div>
        <hr />
        <div className="mb-3">
          <Label className="fs-5 mb-3" title="익절 / 손절율" />
          <Label className="mb-4" title="익절율 (%)" titleclass="fw-500" hasTag>
            <input
              name="profitCutRate"
              value={presetData.profitCutRate}
              onChange={onChangePresetData}
              onBlur={onBlur}
            ></input>
          </Label>
          <Label className="mb-4" title="손절율 (%)" titleclass="fw-500" hasTag>
            <input
              name="lossCutRate"
              value={presetData.lossCutRate}
              onChange={onChangePresetData}
              onBlur={onBlur}
            ></input>
          </Label>
          <Error content={error} />
        </div>
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
