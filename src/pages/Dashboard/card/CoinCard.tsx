import CoinCell from './CoinCell';
import getCoinIcon from '@function/getCoinIcon';
import CoinName from '@interface/api/coin/CoinName';
import CoinTickerAxios from '@interface/api/coin/CoinTickerAxios';
import cointTableCreate from '@ipc/Dashboard/coinTable/coinTableCreate';
import coinTableDestory from '@ipc/Dashboard/coinTable/coinTableDestory';
import '@scss/Table.scss';
import React, {useState, useEffect} from 'react';

const CoinCard: React.FC = () => {
  const [coinNameList, setCoinNameList]: [CoinName[], Function] = useState([]);
  const [coinTable, setCoinTable]: [
    {[key: string]: CoinTickerAxios},
    Function,
  ] = useState({});
  useEffect(() => {
    cointTableCreate(setCoinNameList, setCoinTable);
    return () => {
      coinTableDestory();
    };
  }, []);
  const coinIcon = getCoinIcon();
  return (
    <table className="CoinCard card">
      <thead className="pb-3 border-bottom">
        <tr className="table_head">
          <td className="coin"> Coin </td>
          <td className="price"> Price </td>
          <td className="percent"> 24h % </td>
          <td className="volume"> 24h Volume </td>
        </tr>
      </thead>
      <tbody>
        {coinNameList.map((coin, index) => (
          <CoinCell
            key={index}
            name={coin.korean_name}
            icon={coinIcon[coin.market]}
            ticker={coinTable[coin.market]}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CoinCard;
