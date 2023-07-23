import React from 'react';
import Label from '@components/Basic/Label';
import Error from '@components/Basic/Error';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reducers/index';
import oasisbotSubmit from '@ipc/Oasisbot/oasisbotSubmit';
import {actions} from '@reducers/oasisbot';
import HistoryTrade from '@interface/history/HistoryTrade';

const RunCard: React.FC = () => {
  const {isRunning, state, error, input, oasisbotState, bankname} = useSelector(
    (state: RootState) => ({
      isRunning: state.oasisbot.state.isRunning,
      state: state.oasisbot.state.state,
      error: state.oasisbot.error.oasisbot,
      input: state.oasisbot.input,
      oasisbotState: state.oasisbot.state,
      bankname: state.common.bank.bankname,
    }),
  );

  const dispatch = useDispatch();
  const setHistory = (history: HistoryTrade[]) =>
    dispatch(actions.setHistory(history));
  const setError = error => dispatch(actions.setError(error));

  const onSubmit = e => {
    setHistory([]);
    console.log(input);
    oasisbotSubmit(e, oasisbotState, input, bankname, setError);
  };

  return (
    <div className="RunCard card">
      <Label title="Oasis Bot 활동상태" titleclass="fs-3 fw-600" hasTag>
        {error !== '' ? (
          <Error content={error} contentclass="my-auto" />
        ) : (
          <div className="d-flex">
            <div className="m-auto">
              <p> {state} </p>
            </div>
          </div>
        )}
      </Label>
      <hr />
      <Label
        title={isRunning ? 'Now Running' : 'Now Stopped'}
        titleclass={'fs-2 ' + (isRunning ? 'text-plus' : 'text-gray-300')}
        hasTag
      >
        <button
          className={isRunning ? 'btn-contained-red' : 'btn-contained-gray'}
          onClick={e => {
            onSubmit(e);
          }}
        >
          {isRunning ? 'Stop' : 'Run'}
        </button>
      </Label>
    </div>
  );
};

export default RunCard;
