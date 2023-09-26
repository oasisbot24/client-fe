import React, {useEffect, useState} from 'react';
import Title from '@components/Basic/Title';
import Label from '@components/Basic/Label';
import CircleChart from '@components/Chart/CircleChart';
import HistoryAnalyze from '@interface/history/HistoryAnalyze';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';
import analyzeHistory from '@function/analyzeHistory';

const StateCard: React.FC = () => {
  const {input, history, progress, currency} = useSelector(
    (state: RootState) => ({
      input: state.backtest.input,
      history: state.backtest.history,
      progress: state.backtest.progress,
      currency: state.common.bank.currency,
    }),
  );
  const [data, setData] = useState<HistoryAnalyze>({
    winrate: {}, // 승률
    tradecoin: {},
    startaccount: 0,
    nowaccount: 0,
    maxaccount: 0,
    profitloss: 0,
    profitlossrate: 0,
    mean_waiting: 0, // 평균진입시간
    mean_holding: 0, // 진입후 평균보유시간
    mean_trading_in_month: 0, // 월 평균 매매 횟수
    volatility: 0, // 변동성
    max_profitlossrate: 0, // 최대 수익
    min_profitlossrate: 0, // 최대 손실
  });
  useEffect(() => {
    setData(analyzeHistory(history, input));
  }, [history, input]);

  const winrate = data.winrate;
  const startaccount = data.startaccount;
  const nowaccount = Math.round(data.nowaccount);
  const maxaccount = Math.round(data.maxaccount);
  const profitloss = Math.round(data.profitloss);
  const profitlossrate = parseFloat((data.profitlossrate * 100).toFixed(2));
  const mean_waiting = parseFloat(data.mean_waiting.toFixed(1));
  const mean_holding = parseFloat(data.mean_holding.toFixed(1));
  const mean_trading_in_month = parseFloat(
    data.mean_trading_in_month.toFixed(1),
  );
  const volatility = parseFloat((data.volatility * 100).toFixed(2));
  const max_profitlossrate = data.max_profitlossrate;
  const min_profitlossrate = data.min_profitlossrate;
  return (
    <div className="StateCard card">
      <div
        className={'d-flex ' + (progress.cache.progress === 1 ? 'd-none' : '')}
      >
        <Title className="fs-5 me-3">
          {progress.cache.date?.split(' ')[1]?.replace('.', '') +
            '월 데이터 다운로드'}
        </Title>
        <div className="progress cache">
          <progress
            max="10000"
            value={progress.cache.progress * 10000}
          ></progress>
        </div>
      </div>
      <div
        className={'d-flex ' + (progress.cache.progress === 1 ? '' : 'd-none')}
      >
        <Title className="fs-3 me-1"> 백테스트 현황 </Title>
        <div className="progress">
          <progress
            max="10000"
            value={progress.main.progress * 10000}
          ></progress>
        </div>
      </div>
      <hr />
      <div className="d-flex h-100">
        <div className="w-50">
          <CircleChart
            title="승률"
            src="circlechart1.png"
            className="mb-3"
            data={winrate}
          />
          <Label
            className="mb-4"
            title="시작잔고"
            content={startaccount + ' ' + currency}
          />
          <Label
            className="mb-4"
            title="현재잔고"
            content={nowaccount + ' ' + currency}
          />
          <Label
            className="mb-4"
            title="손익금액"
            content={profitloss + ' ' + currency}
          />
          <Label
            className=""
            title="손익률"
            content={(profitlossrate > 0 ? '+' : '') + profitlossrate + '%'}
            contentclass={data.profitlossrate >= 0 ? 'plus' : 'minus'}
          />
        </div>
        <div className="hr-vertical"></div>
        <div className="w-50">
          <Label
            className="mt-5 mb-3"
            title="평균 진입 대기시간"
            content={mean_waiting + '시간'}
          />
          <Label
            className="mb-3"
            title="진입 후 평균 보유시간"
            content={mean_holding + '시간'}
          />
          <Label
            className="mb-3"
            title="월 평균 매매 횟수"
            content={mean_trading_in_month + '회'}
          />
          <Label
            className=""
            title="최대 도달 잔고"
            content={maxaccount + ' ' + currency}
          />
          <hr />
          <Label className="mb-3" title="변동성" content={volatility + '%'} />
          <Label className="" title="최대 수익 / 손실" hasTag>
            <div className="d-flex">
              <p className="plus">{'+' + max_profitlossrate + '%'}</p>
              <p className="mx-5"> / </p>
              <p className="minus">{min_profitlossrate + '%'}</p>
            </div>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default StateCard;
