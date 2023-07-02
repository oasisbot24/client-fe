import '@scss/Table.scss';
import React from 'react';
import numberToComma from '@function/numberToComma';
import TradeHistory from '@interface/TradeHistory';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';

interface Props {
  key: string;
  data: TradeHistory;
}

const HistoryCell: React.FC<Props> = ({key, data}) => {
  const {currency} = useSelector((state: RootState) => ({
    currency: state.common.bank.currency,
  }));
  const isBuy = data.position === 'buy' ? true : false;
  const hasPoint = data.point != null && data.point > 0 ? true : false;
  let profitClass = '';
  if (!isBuy) {
    profitClass = 'plus';
    if (data.profitloss < 0) profitClass = 'minus';
  }
  const date = data.date;
  const type = data.type;
  const position = data.position;
  const price = numberToComma(data.price, currency === 'KRW');
  const volume = parseFloat(data.volume.toFixed(4));
  const totalprice = numberToComma(data.totalprice, currency === 'KRW');
  const profitlossrate = parseFloat((data.profitlossrate * 100).toFixed(2));
  const profitloss = numberToComma(data.profitloss, currency === 'KRW');
  const point = Math.round(data.point);
  return (
    <tr className="table_cell py-4">
      <td className="date"> {date} </td>
      <td className="type"> {type} </td>
      <td className={'position ' + (isBuy ? 'buy' : 'sell')}> {position} </td>
      <td className="price"> {price} </td>
      <td className="volume"> {volume} </td>
      <td className="totalprice"> {totalprice} </td>
      <td className={'profitlossrate ' + profitClass}>
        {isBuy ? '-' : (profitlossrate > 0 ? '+' : '') + profitlossrate + '%'}
      </td>
      <td className={'profitloss ' + profitClass}>
        {isBuy ? '-' : (profitlossrate > 0 ? '+' : '') + profitloss}
      </td>
      <td className="point"> {hasPoint ? '-' + point : '-'}</td>
    </tr>
  );
};

export default HistoryCell;
