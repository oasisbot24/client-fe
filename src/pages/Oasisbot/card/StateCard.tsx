import React from 'react';
import Label from '@components/Basic/Label';
import numberToComma from '@function/numberToComma';
import OasisbotState from '@interface/OasisbotState';
import CoinTickerAxios from '@interface/api/coin/CoinTickerAxios';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';

interface Props {
  coinTable: {[key: string]: CoinTickerAxios};
}

const StateCard: React.FC<Props> = ({coinTable}) => {
  const {currency, state} = useSelector((state: RootState) => ({
    currency: state.common.bank.currency,
    state: state.oasisbot.state,
  }));

  let current_state = {class: '', value: '중지'};
  if (state.isRunning === false) {
    current_state.class = 'text-gray-300';
    current_state.value = '중지';
  } else if (state.account != null) {
    if (state.account.coin.volume > 0) {
      current_state.class = 'plus';
      current_state.value = '진입';
    } else current_state.value = '대기';
  }

  let trade_price;
  if (state.account != null) {
    trade_price = coinTable[state.account?.coin.type]?.trade_price;
  }
  const StateData: React.FC = () => {
    const price = state.account.coin.balance / state.account.coin.volume;
    const balance = state.account.coin.balance;
    const current_balance = state.account.coin.volume * trade_price;
    const pl = current_balance - balance;
    const pl_rate = pl / balance;
    const profitCutRate = state.profitCutRate;
    const profitCutPrice = price * (1 + profitCutRate);
    const lossCutRate = state.lossCutRate;
    const lossCutPrice = price * (1 + lossCutRate);
    return (
      <div className="d-flex h-100">
        <div className="w-50">
          <Label
            className="mb-4"
            title="매수가"
            content={
              numberToComma(Math.round(price * 1000) / 1000) + ' ' + currency
            }
          />
          <Label
            className="mb-4"
            title="총 매수금액"
            content={
              numberToComma(Math.round(balance * 1000) / 1000) + ' ' + currency
            }
          />
          <Label
            className="mb-4"
            title="총 평가금액"
            content={
              numberToComma(Math.round(current_balance * 1000) / 1000) +
              ' ' +
              currency
            }
          />
          <Label
            title="미실현 손익"
            content={
              (pl_rate > 0 ? '+' : '') + Math.floor(pl_rate * 100) / 100 + '%'
            }
            contentclass={pl_rate > 0 ? 'plus' : 'minus'}
          />
        </div>
        <div className="hr-vertical"></div>
        <div className="w-50">
          <Label
            className="mb-4"
            title="목표가"
            content={
              numberToComma(Math.round(profitCutPrice * 1000) / 1000) +
              ' ' +
              currency
            }
          />
          <Label
            className="mb-4"
            title="목표 수익률"
            content={'+' + Math.round(profitCutRate * 10000) / 100 + '%'}
            contentclass="plus"
          />
          <Label
            className="mb-4"
            title="손절가"
            content={
              numberToComma(Math.round(lossCutPrice * 1000) / 1000) +
              ' ' +
              currency
            }
          />
          <Label
            title="손절시 수익률"
            content={Math.round(lossCutRate * 10000) / 100 + '%'}
            contentclass="minus"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="StateCard card">
      <Label
        title="현재 상태"
        titleclass={'fs-3 fw-600'}
        content={current_state.value}
        contentclass={'fs-2 ' + current_state.class}
      />
      <hr />
      {state.account != null && state.account.coin.volume > 0 ? (
        <StateData />
      ) : (
        ''
      )}
    </div>
  );
};

export default StateCard;
