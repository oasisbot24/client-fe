import React, {useState} from 'react';
import {useEffect} from 'react';
import getCoinList from '@ipc/api/getCoinList';
import CoinName from '@interface/api/coin/CoinName';

interface Props {
  value: any;
  onChange: Function;
  type: string;
}

const CointypeSetting: React.FC<Props> = ({type, value, onChange}) => {
  const [coinList, setCoinList] = useState<CoinName[]>([]);

  useEffect(() => {
    getCoinList((data: CoinName[]) => {
      let unshiftCoinList = [...data];
      unshiftCoinList.unshift({
        market: 'select',
        korean_name: '코인 선택',
        english_name: 'select',
      });
      setCoinList(unshiftCoinList);
    });
  }, []);

  return (
    <select
      name={type}
      value={value}
      onChange={e => {
        onChange(e);
      }}
    >
      {coinList.map((coin, index) => (
        <option key={index} value={coin.market}>
          {coin.korean_name}
        </option>
      ))}
    </select>
  );
};

const StandardminuteSetting: React.FC<Props> = ({type, value, onChange}) => {
  const minutesList = [
    {value: 1, name: '1분봉'},
    {value: 3, name: '3분봉'},
    {value: 5, name: '5분봉'},
    {value: 15, name: '15분봉'},
    {value: 30, name: '30분봉'},
    {value: 60, name: '1시간봉'},
    {value: 240, name: '4시간봉'},
  ];
  return (
    <select
      name={type}
      value={value}
      onChange={e => {
        onChange(e);
      }}
    >
      {minutesList.map((data, index) => (
        <option key={index} value={data.value}>
          {data.name}
        </option>
      ))}
    </select>
  );
};

const IndicatorDataSetting: React.FC<Props> = ({type, value, onChange}) => {
  if (type === 'coin_type') {
    return CointypeSetting({type, value, onChange});
  } else if (type === 'standard_minute') {
    return StandardminuteSetting({type, value, onChange});
  }
};

export default IndicatorDataSetting;
