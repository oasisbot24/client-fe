import React from 'react';
import Label from '@components/Basic/Label';
import Error from '@components/Basic/Error';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reducers/index';
import oasisbotSubmit from '@ipc/Oasisbot/oasisbotSubmit';
import {actions} from '@reducers/oasisbot';
import HistoryTrade from '@interface/history/HistoryTrade';
import {OasisbotError} from '@reducers/oasisbot/error';

const RunCard: React.FC = () => {
  const {isRunning, error, input, bankname} = useSelector(
    (state: RootState) => ({
      isRunning: state.oasisbot.isRunning,
      error: state.oasisbot.error.oasisbot,
      input: state.oasisbot.input,
      bankname: state.common.bank.bankname,
    }),
  );

  const dispatch = useDispatch();
  const setHistory = (history: HistoryTrade[]) =>
    dispatch(actions.setHistory(history));
  const setError = (error: OasisbotError) => dispatch(actions.setError(error));

  const onSubmit = e => {
    setHistory([]);
    console.log(input);
    const error = oasisbotSubmit(e, isRunning.value, input, bankname);
    if (error !== null) {
      setError(error);
    }
  };

  return (
    <div className="RunCard card">
      <Label title="Oasis Bot 활동상태" titleclass="fs-3 fw-600" hasTag>
        {error !== '' ? (
          <Error content={error} contentclass="my-auto" />
        ) : (
          <div className="d-flex">
            <div className="m-auto">
              <p> {isRunning.value} </p>
            </div>
          </div>
        )}
      </Label>
      <hr />
      <Label
        title={isRunning.value ? 'Now Running' : 'Now Stopped'}
        titleclass={'fs-2 ' + (isRunning.value ? 'text-plus' : 'text-gray-300')}
        hasTag
      >
        <button
          className={
            isRunning.value ? 'btn-contained-red' : 'btn-contained-gray'
          }
          onClick={e => {
            onSubmit(e);
          }}
        >
          {isRunning.value ? 'Stop' : 'Run'}
        </button>
      </Label>
    </div>
  );
};

export default RunCard;
