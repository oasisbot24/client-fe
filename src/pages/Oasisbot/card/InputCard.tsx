import React from 'react';
import Title from '@components/Basic/Title';
import Label from '@components/Basic/Label';
import {useState, useEffect} from 'react';
import getPresetList from '@ipc/Setting/preset/getPresetList';
import getPresetData from '@ipc/Setting/preset/getPresetData';
import Error from '@components/Basic/Error';
import TradeCoin from './TradeCoin';
import OasisbotInputInterface from '@interface/input/OasisbotInputInterface';
import CoinTickerAxios from '@interface/api/coin/CoinTickerAxios';
import PresetInterface from '@interface/PresetInterface';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@reducers/index';
import {actions} from '@reducers/oasisbot';

interface Props {
  coinTable: {[key: string]: CoinTickerAxios};
}

const InputCard: React.FC<Props> = ({coinTable}) => {
  const {presetList} = useSelector((state: RootState) => ({
    presetList: state.common.file.presetList,
  }));
  {
    const [presetList, setPresetList] = useState([]);
    const [presetData, setPresetData] = useState<PresetInterface>({
      name: '',
      coin_type: '',
      indicators: [],
      profitCutRate: 0,
      lossCutRate: 0,
      isError: false,
    });

    const {input, error} = useSelector((state: RootState) => ({
      input: state.oasisbot.input,
      error: state.oasisbot.error,
    }));
    const dispatch = useDispatch();
    const setInput = (input: OasisbotInputInterface) =>
      dispatch(actions.setInput(input));
    const setError = error => dispatch(actions.setError(error));

    const onChange = e => {
      const {value, name} = e.target;
      if (name === 'preset') {
        getPresetData(setPresetData, value);
      }
      setInput({
        ...input,
        [name]: value,
      });
    };

    const onBlur = e => {
      const {value, name} = e.target;
      if (name === 'startAccount') {
        let newInput = {...input};
        if (isNaN(parseInt(value))) newInput[name] = 0;
        else newInput[name] = parseInt(value);
        setInput(newInput);
      }
    };

    useEffect(() => {
      onChange({target: {name: 'preset', value: presetList[0]}});
      getPresetList(setPresetList, res => setInput({...input, preset: res[0]}));
    }, []);

    useEffect(() => {
      if (presetData.isError) {
        setError(prev => {
          let current = {...prev};
          current.preset = '손상된 프리셋입니다';
          return current;
        });
      } else {
        setError(prev => {
          let current = {...prev};
          current.preset = '';
          return current;
        });
      }
    }, [presetData]);

    return (
      <div className="InputCard card">
        <Title className="fs-3"> Oasis Bot 설정 </Title>
        <hr />
        <div className="mb-4">
          <Label title="프리셋" hasTag>
            <select name="preset" onChange={onChange}>
              {presetList.map((preset, index) => (
                <option key={index} value={preset}>
                  {preset}
                </option>
              ))}
            </select>
          </Label>
          <Error className="mt-5" content={error.preset} />
        </div>
        {presetData.isError === false && presetData.name !== '' ? (
          <TradeCoin presetData={presetData} coinTable={coinTable} />
        ) : (
          ''
        )}
        <hr />

        <div className="mb-4">
          <Label title="시작잔고" hasTag>
            <input
              name="startAccount"
              placeholder="직접 입력"
              value={input.startBalance}
              onChange={onChange}
              onBlur={onBlur}
            ></input>
          </Label>
          <Error className="mt-5" content={error.startAccount} />
        </div>
      </div>
    );
  }
};
export default InputCard;
