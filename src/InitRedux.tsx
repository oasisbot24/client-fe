import React from 'react';
import ReduxCreate from '@ipc/Redux/ReduxCreate';
import ReduxDestroy from '@ipc/Redux/ReduxDestroy';
import {actions} from '@reducers/common';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {UserType} from '@interface/api/backend/user';

const InitRedux: React.FC = () => {
  const dispatch = useDispatch();
  const setVersion = (data: string) => dispatch(actions.info.setVersion(data));
  const setUsdtToKrw = (data: {date: string; krw: number}) =>
    dispatch(actions.info.setUsdtToKrw(data));
  const setBankname = (data: string) =>
    dispatch(actions.bank.setBankname(data));
  const setCurrency = (data: string) =>
    dispatch(actions.bank.setCurrency(data));
  const setBalance = (data: string) => dispatch(actions.bank.setBalance(data));

  const setPresetList = (data: string[]) =>
    dispatch(actions.file.setPresetList(data));
  const setIndicatorList = (data: string[]) =>
    dispatch(actions.file.setIndicatorList(data));

  useEffect(() => {
    ReduxCreate(
      setVersion,
      setUsdtToKrw,
      setBankname,
      setCurrency,
      setBalance,
      setPresetList,
      setIndicatorList,
    );
    return () => {
      ReduxDestroy();
    };
  }, []);
  return <></>;
};

export default InitRedux;
