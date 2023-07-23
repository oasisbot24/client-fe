import React, {useState} from 'react';
import Title from '@components/Basic/Title';
import Label from '@components/Basic/Label';
import BacktestInputInterface from '@interface/input/BacktestInputInterface';
import Error from '@components/Basic/Error';
import backtestSubmit from '@ipc/Backtest/backtestSubmit';
import {RootState} from '@reducers/index';
import {actions} from '@reducers/backtest';
import {useDispatch, useSelector} from 'react-redux';
import PresetSelect from '@components/Select/IndicatorSelect';

const InputCard: React.FC = () => {
  const {isRunning, input, bankname, commission_rate} = useSelector(
    (state: RootState) => ({
      isRunning: state.backtest.state.isRunning,
      input: state.backtest.input,
      bankname: state.common.bank.bankname,
      commission_rate: state.common.user.commission_rate,
    }),
  );
  const dispatch = useDispatch();
  const setInput = (input: BacktestInputInterface) =>
    dispatch(actions.setInput(input));

  const initError = {
    preset: '',
    startAccount: '',
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
    if (name === 'startAccount') {
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
          backtestSubmit(e, isRunning, input, bankname, setError);
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
            <Label title="시작잔고" hasTag>
              <input
                name="startAccount"
                placeholder="직접 입력"
                value={input.startAccount}
                onChange={onChangeInput}
                onBlur={onBlur}
              ></input>
            </Label>
            <Error className="mt-5" content={error.startAccount} />
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

          <Label className="mb-4" title="수수료율" hasTag>
            <input
              name="feeRate"
              value={commission_rate + '%'}
              readOnly
            ></input>
          </Label>
        </div>
        <button
          className={
            'w-100 ' +
            (isRunning === false
              ? 'btn-contained-darkblue'
              : 'btn-contained-gray')
          }
        >
          <p> {isRunning === false ? '백테스트 시작' : '백테스트 중지'} </p>
        </button>
      </form>
    </div>
  );
};

export default InputCard;
