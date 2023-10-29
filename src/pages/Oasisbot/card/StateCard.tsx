import React from 'react';
import Label from '@components/Basic/Label';
import numberToComma from '@function/numberToComma';
import CoinTickerAxios from '@interface/api/coin/CoinTickerAxios';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';

interface Props {
  coinTable: {[key: string]: CoinTickerAxios};
}

const StateCard: React.FC<Props> = ({coinTable}) => {
  const {currency, isRunning, wallet, preset} = useSelector(
    (state: RootState) => ({
      currency: state.common.bank.currency,
      isRunning: state.oasisbot.isRunning,
      wallet: state.oasisbot.wallet,
      preset: state.oasisbot.preset,
    }),
  );

  let current_state = {class: '', value: '중지'};
  if (isRunning.value === false) {
    current_state.class = 'text-gray-300';
    current_state.value = '중지';
  } else if (wallet !== null) {
    if (
      wallet.long_wallet.coin.volume > 0 &&
      wallet.short_wallet.coin.volume > 0
    ) {
      current_state.class = 'text-gray-300';
      current_state.value = 'LONG & SHORT 진입';
    } else if (wallet.long_wallet.coin.volume > 0) {
      current_state.class = 'plus';
      current_state.value = 'LONG 진입';
    } else if (wallet.short_wallet.coin.volume > 0) {
      current_state.class = 'plus';
      current_state.value = 'SHORT 진입';
    } else current_state.value = '대기';
  }

  let long_trade_price;
  let short_trade_price;
  if (wallet !== null) {
    long_trade_price = coinTable[wallet?.long_wallet.coin.type]?.trade_price;
    short_trade_price = coinTable[wallet?.short_wallet.coin.type]?.trade_price;
  }
  const StateData: React.FC = () => {
    const long_price =
      wallet.long_wallet.coin.balance / wallet.long_wallet.coin.volume;
    const short_price =
      wallet.short_wallet.coin.balance / wallet.short_wallet.coin.volume;
    const long_balance = wallet.long_wallet.coin.balance;
    const short_balance = wallet.short_wallet.coin.balance;
    const total_balance = long_balance + short_balance;
    const current_balance =
      wallet.long_wallet.coin.volume * long_trade_price +
      wallet.short_wallet.coin.volume * short_trade_price;
    const pl = current_balance - total_balance;
    const pl_rate = pl / total_balance;
    const profitCutRate = preset.profitCutRate;
    const long_profitCutPrice = long_price * (1 + profitCutRate);
    const short_profitCutPrice = short_price * (1 - profitCutRate);
    const lossCutRate = preset.lossCutRate;
    const long_lossCutPrice = long_price * (1 + lossCutRate);
    const short_lossCutPrice = short_price * (1 - lossCutRate);
    return (
      <div className="d-flex h-100">
        <div className="w-50">
          <Label
            className="mb-4"
            title="Long 매수가"
            content={
              numberToComma(Math.round(long_price * 1000) / 1000) +
              ' ' +
              currency
            }
          />
          <Label
            className="mb-4"
            title="Short 매수가"
            content={
              numberToComma(Math.round(short_price * 1000) / 1000) +
              ' ' +
              currency
            }
          />
          <Label
            className="mb-4"
            title="Long 매수금액"
            content={
              numberToComma(Math.round(long_balance * 1000) / 1000) +
              ' ' +
              currency
            }
          />
          <Label
            className="mb-4"
            title="Short 매수금액"
            content={
              numberToComma(Math.round(short_balance * 1000) / 1000) +
              ' ' +
              currency
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
            title="목표 수익률"
            content={'+' + Math.round(profitCutRate * 10000) / 100 + '%'}
            contentclass="plus"
          />
          <Label
            className="mb-4"
            title="Long 목표가"
            content={
              numberToComma(Math.round(long_profitCutPrice * 1000) / 1000) +
              ' ' +
              currency
            }
          />
          <Label
            className="mb-4"
            title="Short 목표가"
            content={
              numberToComma(Math.round(short_profitCutPrice * 1000) / 1000) +
              ' ' +
              currency
            }
          />
          <Label
            title="손절시 수익률"
            content={Math.round(lossCutRate * 10000) / 100 + '%'}
            contentclass="minus"
          />
          <Label
            className="mb-4"
            title="Long 손절가"
            content={
              numberToComma(Math.round(long_lossCutPrice * 1000) / 1000) +
              ' ' +
              currency
            }
          />
          <Label
            className="mb-4"
            title="Short 손절가"
            content={
              numberToComma(Math.round(short_lossCutPrice * 1000) / 1000) +
              ' ' +
              currency
            }
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
      {wallet != null &&
      (wallet.long_wallet.coin.volume > 0 ||
        wallet.short_wallet.coin.volume > 0) ? (
        <StateData />
      ) : (
        <></>
      )}
    </div>
  );
};

export default StateCard;
