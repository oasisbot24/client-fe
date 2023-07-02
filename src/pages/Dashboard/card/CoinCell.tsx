import React from 'react';
import Icon from '@components/Basic/Icon';
import {useState, useEffect} from 'react';
import CoinTickerAxios from '@interface/api/coin/CoinTickerAxios';
import numberToComma from '@function/numberToComma';
import numberToKorean from '@function/numberToKorean';
import {RootState} from '@reducers/index';
import {useSelector} from 'react-redux';

interface Props {
  name: string;
  icon: string;
  ticker: CoinTickerAxios;
}

const CoinCell: React.FC<Props> = props => {
  const {currency} = useSelector((state: RootState) => ({
    currency: state.common.bank.currency,
  }));
  const [ticker, setTicker] = useState<CoinTickerAxios>();
  const [animate, setAnimate] = useState('');

  useEffect(() => {
    if (ticker?.trade_price < props.ticker?.trade_price) {
      setAnimate('');
      setAnimate('plus');
    } else if (ticker?.trade_price > props.ticker?.trade_price) {
      setAnimate('');
      setAnimate('minus');
    }
    setTicker(props.ticker);
  }, [props.ticker]);

  return (
    <tr className={'table_cell py-3'}>
      <td className="coin">
        <div className="d-flex">
          <Icon src={props.icon} className="me-4" width={28} />
          {props.name}
        </div>
      </td>
      <td className={'price fw-500 highlight-text-' + animate}>
        {currency === 'KRW'
          ? numberToKorean(Math.round(ticker?.trade_price)) + ' ' + currency
          : numberToComma(ticker?.trade_price) + ' ' + currency}
      </td>
      <td
        className={
          'percent text-' + (ticker?.signed_change_rate >= 0 ? 'plus' : 'minus')
        }
      >
        {Math.round(ticker?.signed_change_rate * 10000) / 100}%
      </td>
      <td className="volume">
        {currency === 'KRW'
          ? numberToKorean(Math.round(ticker?.acc_trade_price_24h)) +
            ' ' +
            currency
          : numberToComma(Math.round(ticker?.acc_trade_price_24h), true) +
            ' ' +
            currency}
      </td>
    </tr>
  );
};

export default CoinCell;
