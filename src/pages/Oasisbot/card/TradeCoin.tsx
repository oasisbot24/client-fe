import React from 'react';
import Title from '@components/Basic/Title';
import Icon from '@components/Basic/Icon';
import Label from '@components/Basic/Label';
import {useState, useEffect} from 'react';
import getCoinIcon from '@function/getCoinIcon';
import CoinTickerAxios from '@interface/api/coin/CoinTickerAxios';
import CoinName from '@interface/api/coin/CoinName';
import numberToKorean from '@function/numberToKorean';
import Preset from '@interface/Preset';
import getCoinList from '@ipc/api/getCoinList';
import numberToComma from '@function/numberToComma';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';

interface Props {
  presetData: Preset;
  coinTable: {[key: string]: CoinTickerAxios};
}

const TradeCoin: React.FC<Props> = ({presetData, coinTable}) => {
  const {currency} = useSelector((state: RootState) => ({
    currency: state.common.bank.currency,
  }));
  const [ticker, setTicker] = useState<CoinTickerAxios>();
  const [coinList, setCoinList] = useState<CoinName[]>([]);
  const [coinName, setCoinName] = useState<CoinName>();
  const [animate, setAnimate] = useState('');

  useEffect(() => {
    getCoinList(setCoinList);
    console.log(presetData);
  }, []);

  useEffect(() => {
    if (ticker?.trade_price < coinTable[presetData.coin_type]?.trade_price) {
      setAnimate('');
      setAnimate('plus');
    } else if (
      ticker?.trade_price > coinTable[presetData.coin_type]?.trade_price
    ) {
      setAnimate('');
      setAnimate('minus');
    }
    setTicker(coinTable[presetData.coin_type]);
  }, [coinTable, presetData]);

  useEffect(() => {
    coinList.map((value, index) => {
      if (value.market === presetData.coin_type) setCoinName(value);
      return value;
    });
  }, [coinList, presetData]);

  const coinIcon = getCoinIcon();

  return (
    <div className="Tradecoin">
      <Title className="fw-600 mb-4"> 매매코인 </Title>
      <div className="d-flex mb-3">
        <Icon
          className="my-auto me-3"
          width={32}
          src={coinIcon[presetData.coin_type]}
        />
        <div className="flex-grow-1">
          <Label
            title={presetData.coin_type}
            content={
              currency === 'KRW'
                ? numberToKorean(ticker?.trade_price) + ' ' + currency
                : numberToComma(ticker?.trade_price) + ' ' + currency
            }
            contentclass={'fw-500 highlight-text-' + animate}
          />
          <Label title={coinName?.korean_name} titleclass="fw-400" hasTag>
            <div className="d-flex">
              <p className="me-5">전일대비</p>
              <p
                className={
                  ticker?.signed_change_rate >= 0 ? 'text-plus' : 'text-minus'
                }
              >
                {Math.round(ticker?.signed_change_rate * 10000) / 100}%{' '}
              </p>
            </div>
          </Label>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50 me-4">
          <Label
            title="고가"
            content={numberToComma(ticker?.high_price, currency === 'KRW')}
            contentclass="text-plus"
          />
          <Label
            title="저가"
            content={numberToComma(ticker?.low_price, currency === 'KRW')}
            contentclass="text-minus"
          />
        </div>
        <div className="w-50 ms-4">
          <Label
            title="거래량"
            content={
              numberToComma(ticker?.acc_trade_volume_24h, true) +
              ' ' +
              (currency === 'KRW'
                ? presetData.coin_type?.substring(4)
                : presetData.coin_type?.substring(0, 3))
            }
          />
          <Label
            title="거래대금"
            content={numberToComma(
              Math.round(ticker?.acc_trade_price_24h),
              true,
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TradeCoin;
