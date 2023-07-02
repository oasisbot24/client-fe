import React from 'react';
import TradestyleCard from '../Common/TradestyleCard';
import CoinCard from './card/CoinCard';
import PatchnoteCard from './card/PatchnoteCard';
import TradeHistory from '@interface/TradeHistory';
import dashboardCreate from '@ipc/Dashboard/dashboardCreate';
import dashboardDestroy from '@ipc/Dashboard/dashboardDestroy';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '@reducers/dashboard';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const setHistory = (history: TradeHistory[]) =>
    dispatch(actions.history.setHistory(history));
  const setPatchnoteContent = (patchnote: string) =>
    dispatch(actions.patchnote.setPatchnote(patchnote));

  useEffect(() => {
    dashboardCreate(setHistory, setPatchnoteContent);
    return () => {
      dashboardDestroy();
    };
  }, []);

  return (
    <div className="Dashboard">
      <div className="Statistic mb-3">
        <div className="d-flex">
          <div className="w-100">
            <TradestyleCard />
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="CriptoCurrentPrice w-50 me-4 d-flex-column">
          <div className="flex-grow-1">
            <CoinCard />
          </div>
        </div>
        <div className="Community w-50 ms-4 d-flex-column">
          <div className="flex-grow-1">
            <PatchnoteCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
