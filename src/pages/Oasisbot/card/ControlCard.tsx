import React from 'react';
import Title from '@components/Basic/Title';
import Label from '@components/Basic/Label';
import numberToComma from '@function/numberToComma';
import {useState, useEffect} from 'react';
import postOrderBuy from '@ipc/api/postOrderBuy';
import postOrderSell from '@ipc/api/postOrderSell';
import OasisbotState from '@interface/OasisbotState';
import CoinTickerAxios from '@interface/api/coin/CoinTickerAxios';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';

interface Props {
  coinTable: {[key: string]: CoinTickerAxios};
}

const ControlCard: React.FC<Props> = ({coinTable}) => {
  const {currency} = useSelector((state: RootState) => ({
    currency: state.common.bank.currency,
  }));
  const [trade_price, set_trade_price] = useState(0);
  const [buyBalance, setBuyBalance] = useState(0);
  const [sellBalance, setSellBalance] = useState(0);

  const {state} = useSelector((state: RootState) => ({
    state: state.oasisbot.state,
  }));

  const onClickBuyBalance = e => {
    const weight = parseInt(e.target.value) / 100;
    if (state.account != null) setBuyBalance(state.account.assets * weight);
  };
  const onClickSellBalance = e => {
    const weight = parseInt(e.target.value) / 100;
    if (state.account != null)
      setSellBalance(state.account.coin.balance * weight);
  };

  const buy = () => {
    if (state.account != null) {
      const data = {
        trade_price: trade_price,
        weight:
          (buyBalance + state.account.coin.balance) / state.account.assets,
      };
      postOrderBuy(data, res => console.log(res));
    }
  };

  const sell = () => {
    if (state.account != null) {
      const data = {
        trade_price: trade_price,
        weight: sellBalance / state.account.coin.balance,
      };
      postOrderSell(data, res => console.log(res));
    }
  };

  useEffect(() => {
    if (state.account != null) {
      set_trade_price(coinTable[state.account.coin.type]?.trade_price);
    }
  }, [state, coinTable]);

  return (
    <div className="ControlCard card">
      <div className="d-flex">
        <div className="w-50">
          <Title className="fs-3"> 추가 매수 </Title>
          <hr />
          <Label
            className="mb-4"
            title="매수가"
            content={numberToComma(trade_price) + ' ' + currency}
          />
          <Label className="mb-4" title="주문금액" hasTag>
            <div className="d-flex">
              <input
                className="button me-5"
                type="button"
                value="10%"
                onClick={onClickBuyBalance}
              ></input>
              <input
                className="button me-5"
                type="button"
                value="25%"
                onClick={onClickBuyBalance}
              ></input>
              <input
                className="button me-5"
                type="button"
                value="50%"
                onClick={onClickBuyBalance}
              ></input>
              <input
                className="button me-5"
                type="button"
                value="100%"
                onClick={onClickBuyBalance}
              ></input>
              <input
                className="order disabled"
                type="text"
                value={
                  buyBalance === 0 ? '' : buyBalance.toFixed(3) + ' ' + currency
                }
                readOnly
              ></input>
            </div>
          </Label>
          <button className="ms-auto btn-contained-red" onClick={buy}>
            {' '}
            매수{' '}
          </button>
        </div>
        <div className="hr-vertical"></div>
        <div className="w-50">
          <Title className="fs-3"> 포지션 정리 </Title>
          <hr />
          <Label
            className="mb-4"
            title="매도가"
            content={numberToComma(trade_price) + ' ' + currency}
          />
          <Label className="mb-4" title="주문금액" hasTag>
            <div className="d-flex">
              <input
                className="button me-5"
                type="button"
                value="10%"
                onClick={onClickSellBalance}
              ></input>
              <input
                className="button me-5"
                type="button"
                value="25%"
                onClick={onClickSellBalance}
              ></input>
              <input
                className="button me-5"
                type="button"
                value="50%"
                onClick={onClickSellBalance}
              ></input>
              <input
                className="button me-5"
                type="button"
                value="100%"
                onClick={onClickSellBalance}
              ></input>
              <input
                className="order disabled"
                type="text"
                value={
                  sellBalance === 0
                    ? ''
                    : sellBalance.toFixed(3) + ' ' + currency
                }
                readOnly
              ></input>
            </div>
          </Label>
          <button className="ms-auto btn-contained-blue" onClick={sell}>
            {' '}
            매도{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlCard;
