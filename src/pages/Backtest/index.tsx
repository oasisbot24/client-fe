import '@scss/Backtest.scss';
import React, {useEffect} from 'react';
import InputCard from './card/InputCard';
import StateCard from './card/StateCard';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reducers/index';
import HistoryCard from '../Common/HistoryCard';
import backtestCreate from '@ipc/Backtest/backtestCreate';
import {actions} from '@reducers/backtest/index';
import BacktestInputInterface from '@interface/input/BacktestInputInterface';
import HistoryTrade from '@interface/history/HistoryTrade';
import BacktestProgress from '@interface/BacktestProgress';
import backtestDestroy from '@ipc/Backtest/backtestDestroy';

const Backtest: React.FC = () => {
  const {history} = useSelector((state: RootState) => ({
    history: state.backtest.history,
  }));
  const dispatch = useDispatch();
  const setBacktestIsRunning = (isRunning: boolean) =>
    dispatch(actions.setIsRunning(isRunning));
  const setBacktestInput = (input: BacktestInputInterface) =>
    dispatch(actions.setInput(input));
  const setHistory = (history: HistoryTrade[]) =>
    dispatch(actions.setHistory(history));
  const addHistory = (history: HistoryTrade) =>
    dispatch(actions.addHistory(history));
  const setProgressCache = (cache: BacktestProgress['cache']) =>
    dispatch(actions.setProgressCache(cache));
  const setProgressMain = (main: BacktestProgress['main']) =>
    dispatch(actions.setProgressMain(main));

  useEffect(() => {
    backtestCreate(
      setBacktestIsRunning,
      setBacktestInput,
      setHistory,
      addHistory,
      setProgressCache,
      setProgressMain,
    );
    return () => {
      backtestDestroy();
    };
  }, []);

  return (
    <div className="Backtest">
      <div className="Information mb-3">
        <div className="d-flex">
          <div className="w-33 me-4">
            <InputCard />
          </div>
          <div className="w-66 ms-4">
            <StateCard />
          </div>
        </div>
      </div>
      <div className="History">
        <HistoryCard history={history} />
      </div>
    </div>
  );
};

export default Backtest;
