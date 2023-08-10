import React, {useEffect, useState} from 'react';
import Title from '@components/Basic/Title';
import Label from '@components/Basic/Label';
import BacktestInputInterface from '@interface/input/BacktestInputInterface';
import Error from '@components/Basic/Error';
import backtestSubmit from '@ipc/Backtest/backtestSubmit';
import {RootState} from '@reducers/index';
import {actions} from '@reducers/backtest';
import {useDispatch, useSelector} from 'react-redux';
import PresetSelect from '@components/Select/PresetSelect';
import getCoinList from '@ipc/api/getCoinList';
import CoinName from '@interface/api/coin/CoinName';

const InputCard: React.FC = () => {
  const [coinList, setCoinList] = useState<CoinName[]>([]);

  useEffect(() => {
    getCoinList((res: CoinName[]) => {
      setCoinList([...res]);
      onChangeInput({target: {value: res[0].market, name: 'tradeCoin'}}); // default tradeCoin
    });
  }, []);

  const {isRunning, input, bankname} = useSelector((state: RootState) => ({
    isRunning: state.backtest.isRunning,
    input: state.backtest.input,
    bankname: state.common.bank.bankname,
  }));
  const dispatch = useDispatch();
  const setInput = (input: BacktestInputInterface) =>
    dispatch(actions.setInput(input));

  const initError = {
    preset: '',
    startBalance: '',
    startDate: '',
    endDate: '',
  };
  const [error, setError] = useState(initError);

  const onChangeInput = e => {
    const {value, name} = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onBlur = e => {
    const {value, name} = e.target;
    if (name === 'startBalance') {
      let newInput = {...input};
      if (isNaN(parseInt(value))) newInput[name] = 0;
      else newInput[name] = parseInt(value);
      setInput(newInput);
    }
  };

  return (
    <div className="InputCard card">
      <Title className="fs-3"> 백테스트 수치 </Title>
      <hr />
      <form
        method="post"
        onSubmit={e => {
          backtestSubmit(e, isRunning.value, input, bankname, setError);
        }}
      >
        <div className="mb-3">
          <div className="mb-4">
            <Label title="프리셋" hasTag>
              <PresetSelect onChange={onChangeInput} />
            </Label>
            <Error className="mt-5" content={error.preset} />
          </div>

          <div className="mb-4">
            <Label title="거래코인" hasTag>
              <select
                name="tradeCoin"
                value={input.tradeCoin}
                onChange={onChangeInput}
              >
                {coinList.map((coin, index) => (
                  <option key={index} value={coin.market}>
                    {coin.korean_name}
                  </option>
                ))}
              </select>
            </Label>
          </div>

          <div className="mb-4">
            <Label title="시작잔고" hasTag>
              <input
                name="startBalance"
                placeholder="직접 입력"
                value={input.startBalance}
                onChange={onChangeInput}
                onBlur={onBlur}
              ></input>
            </Label>
            <Error className="mt-5" content={error.startBalance} />
          </div>

          <div className="mb-4">
            <Label title="시작일" hasTag>
              <input
                name="startDate"
                placeholder="YYYY-MM-DD"
                value={input.startDate}
                onChange={onChangeInput}
              ></input>
            </Label>
            <Error className="mt-5" content={error.startDate} />
          </div>

          <div className="mb-4">
            <Label title="종료일" hasTag>
              <input
                name="endDate"
                placeholder="YYYY-MM-DD"
                value={input.endDate}
                onChange={onChangeInput}
              ></input>
            </Label>
            <Error className="mt-5" content={error.endDate} />
          </div>
        </div>
        <button
          className={
            'w-100 ' +
            (isRunning.value ? 'btn-contained-gray' : 'btn-contained-darkblue')
          }
        >
          <p>{isRunning.value ? '백테스트 중지' : '백테스트 시작'}</p>
        </button>
      </form>
    </div>
  );
};

export default InputCard;
