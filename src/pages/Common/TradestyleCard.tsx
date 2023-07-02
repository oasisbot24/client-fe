import React, {useEffect} from 'react';
import Title from '@components/Basic/Title';
import CircleChart from '@components/Chart/CircleChart';
import Label from '@components/Basic/Label';
import AnalyzeHistory, {InitAnalyzeHistory} from '@interface/AnalyzeHistory';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';
import analyzeHistory from '@function/analyzeHistory';

const TradestyleCard: React.FC = () => {
  const {currency, history} = useSelector((state: RootState) => ({
    currency: state.common.bank.currency,
    history: state.dashboard.history,
  }));

  const [data, setData] = React.useState<AnalyzeHistory>(InitAnalyzeHistory);
  useEffect(() => {
    setData(analyzeHistory(history));
  }, [history]);

  return (
    <div className="TradestyleCard card">
      <Title className="fs-3">트레이드 스타일</Title>
      <hr />
      <div className="d-flex">
        <div className="w-50">
          <CircleChart
            title="승률"
            src="circlechart1.png"
            className="mb-3"
            data={data.winrate}
          />
          <CircleChart
            title="거래코인"
            src="circlechart2.png"
            data={data.tradecoin}
          />
        </div>
        <div className="hr-vertical"></div>
        <div className="w-50">
          <Label
            className="mt-5 mb-3"
            title="평균 진입 대기시간"
            content={data.mean_waiting + '시간'}
          />
          <Label
            className="mb-3"
            title="진입 후 평균 보유시간"
            content={data.mean_holding + '시간'}
          />
          <Label
            className="mb-3"
            title="월 평균 매매 횟수"
            content={data.mean_trading_in_month + '회'}
          />
          <Label
            className=""
            title="OASIS BOT 수익"
            contentclass={data.profitloss >= 0 ? 'plus' : 'minus'}
            content={data.profitloss + ' ' + currency}
          />
          <hr />
          <Label
            className="mb-3"
            title="변동성"
            content={data.volatility + '%'}
          />
          <Label className="" title="최대 수익 / 손실" hasTag>
            <div className="d-flex">
              <p className="plus">{'+' + data.max_profitlossrate + '%'}</p>
              <p className="mx-5"> / </p>
              <p className="minus">{data.min_profitlossrate + '%'}</p>
            </div>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TradestyleCard;
