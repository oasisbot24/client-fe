import React from 'react';
import '@scss/Oasisbot.scss';
import InputCard from './card/InputCard';
import RunCard from './card/RunCard';
import StateCard from './card/StateCard';
import ControlCard from './card/ControlCard';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '@reducers/oasisbot/index';
import {RootState} from '@reducers/index';
import HistoryCard from '../Common/HistoryCard';
import oasisbotCreate from '@ipc/Oasisbot/oasisbotCreate';
import oasisbotError from '@ipc/Oasisbot/oasisbotError';
import oasisbotDestroy from '@ipc/Oasisbot/oasisbotDestroy';
import CoinTickerAxios from '@interface/api/coin/CoinTickerAxios';
import HistoryTrade from '@interface/history/HistoryTrade';
import OasisbotInputInterface from '@interface/input/OasisbotInputInterface';
import WalletInterface from '@interface/WalletInterface';

const Oasisbot: React.FC = () => {
  const {history} = useSelector((state: RootState) => ({
    history: state.oasisbot.history,
  }));

  const [coinTable, setCoinTable] = useState<{[key: string]: CoinTickerAxios}>(
    {},
  );
  const dispatch = useDispatch();
  const setOasisbotIsRunning = (isRunning: boolean) =>
    dispatch(actions.setIsRunning({value: isRunning}));

  const setOasisbotWallet = (wallet: WalletInterface) =>
    dispatch(actions.setWallet(wallet));
  const setOasisbotInput = (input: OasisbotInputInterface) =>
    dispatch(actions.setInput(input));
  const setOasisbotError = error => dispatch(actions.setError(error));
  const setHistory = (history: HistoryTrade[]) =>
    dispatch(actions.setHistory(history));
  const addHistory = (history: HistoryTrade) =>
    dispatch(actions.addHistory(history));

  useEffect(() => {
    oasisbotCreate(
      setOasisbotIsRunning,
      setOasisbotWallet,
      setOasisbotInput,
      setHistory,
      addHistory,
      setCoinTable,
    );
    oasisbotError((data: string) => {
      setOasisbotError(prev => {
        return {
          ...prev,
          oasisbot: data,
        };
      });
    });
    return () => {
      oasisbotDestroy();
    };
  }, []);

  return (
    <div className="Oasisbot">
      <div className="Status mb-3">
        <div className="d-flex">
          <div className="w-40 me-4">
            <InputCard coinTable={coinTable} />
          </div>
          <div className="w-60 ms-4 d-flex-column">
            <div className="mb-3">
              <RunCard />
            </div>
            <div className="h-100">
              <StateCard coinTable={coinTable} />
            </div>
          </div>
        </div>
      </div>
      <div className="Control mb-3">
        <ControlCard coinTable={coinTable} />
      </div>
      <div className="History">
        <HistoryCard history={history} />
      </div>
    </div>
  );
};

export default Oasisbot;
