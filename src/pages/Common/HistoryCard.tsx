import HistoryCell from './HistoryCell';
import HistoryTrade from '@interface/history/HistoryTrade';
import '@scss/Table.scss';
import React from 'react';

interface Props {
  history: HistoryTrade[];
}

const HistoryCard: React.FC<Props> = ({history}) => {
  return (
    <table className="HistoryCard card">
      <thead className="pb-3 border-bottom">
        <tr className="table_head">
          <td className="date"> 거래 시각 </td>
          <td className="type"> 종목 </td>
          <td className="position"> 포지션 </td>
          <td className="position"> O / C </td>
          <td className="price"> 매매가 </td>
          <td className="volume"> 매매수량 </td>
          <td className="totalprice"> 총 매매금액 </td>
          <td className="profitlossrate"> 손익률 </td>
          <td className="profitloss"> 실현 손익 </td>
          <td className="point"> 포인트 </td>
        </tr>
      </thead>
      <tbody>
        {history.map((cell, index) => (
          <HistoryCell key={index.toString()} data={cell} />
        ))}
      </tbody>
    </table>
  );
};

export default HistoryCard;
