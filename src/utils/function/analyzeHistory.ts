import AnalyzeHistory from '@interface/AnalyzeHistory';
import BacktestInput from '@interface/BacktestInput';
import TradeHistory from '@interface/TradeHistory';

function analyzeHistory(history: TradeHistory[], input?: BacktestInput) {
  let ret: AnalyzeHistory = {
    winrate: {
      수익: 1,
      손해: 0,
    },
    tradecoin: {},
    startaccount: 0,
    nowaccount: 0,
    maxaccount: 0,
    profitloss: 0,
    profitlossrate: 0,
    mean_waiting: 0,
    mean_holding: 0,
    mean_trading_in_month: 0,
    volatility: 0,
    max_profitlossrate: 0,
    min_profitlossrate: 0,
  };
  if (history.length === 0 || input?.startAccount === 0) return ret;

  let startDate: Date, endDate: Date;
  if (input !== undefined) {
    ret.startaccount = input.startAccount;
    startDate = new Date(input.startDate);
    endDate = new Date(input.endDate);
  } else {
    endDate = new Date(history[0].date);
    endDate.setMilliseconds(0);
    endDate.setSeconds(0);
    endDate.setMinutes(0);
    endDate.setHours(0);
    endDate.setDate(1);
    endDate.setMonth(endDate.getMonth() + 1);
    startDate = new Date(history[history.length - 1].date);
    startDate.setMilliseconds(0);
    startDate.setSeconds(0);
    startDate.setMinutes(0);
    startDate.setHours(0);
    startDate.setDate(1);
  }
  const duration =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  let countTotalPL = 0;
  let countProfit = 0;
  let countWaiting = 0;
  let countHolding = 0;
  let durationWaiting = 0;
  let durationHolding = 0;
  let last_position = history.length - 1;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].position === 'buy') {
      if (history[last_position].position === 'sell') {
        countWaiting++;
        const buyDate = new Date(history[i].date);
        const sellDate = new Date(history[last_position].date);
        durationWaiting +=
          (buyDate.getTime() - sellDate.getTime()) / (1000 * 60 * 60);
        last_position = i;
      }
    }
    if (history[i].position === 'sell') {
      countTotalPL++;
      if (history[i].profitloss > 0) countProfit++;
      if (history[last_position].position === 'buy') {
        countHolding++;
        const sellDate = new Date(history[i].date);
        const buyDate = new Date(history[last_position].date);
        durationHolding +=
          (sellDate.getTime() - buyDate.getTime()) / (1000 * 60 * 60);
        last_position = i;
      }
    }
    if (history[i].type in ret.tradecoin) ret.tradecoin[history[i].type] += 1;
    else ret.tradecoin[history[i].type] = 1;
    ret.profitloss += history[i].profitloss;
    if (ret.startaccount > 0) {
      ret.nowaccount = ret.startaccount + ret.profitloss;
      ret.profitlossrate = ret.profitloss / ret.startaccount;
      if (ret.maxaccount < ret.nowaccount) ret.maxaccount = ret.nowaccount;
      if (ret.max_profitlossrate < ret.profitlossrate)
        ret.max_profitlossrate = ret.profitlossrate;
      if (ret.min_profitlossrate > ret.profitlossrate)
        ret.min_profitlossrate = ret.profitlossrate;
    } else {
      if (history[i].profitlossrate != null)
        ret.profitlossrate += history[i].profitlossrate;
      if (ret.max_profitlossrate < ret.profitlossrate)
        ret.max_profitlossrate = ret.profitlossrate;
      if (ret.min_profitlossrate > ret.profitlossrate)
        ret.min_profitlossrate = ret.profitlossrate;
    }
  }
  // caculating mean
  if (countWaiting > 0) ret.mean_waiting = durationWaiting / countWaiting;
  if (countHolding > 0) ret.mean_holding = durationHolding / countHolding;
  if (countTotalPL > 0) {
    ret.winrate['수익'] = countProfit / countTotalPL;
    ret.winrate['손해'] = 1 - countProfit / countTotalPL;
  }
  Object.keys(ret.tradecoin).map((key, index) => {
    return (ret.tradecoin[key] /= history.length);
  });
  ret.mean_trading_in_month = (history.length / duration) * 30;

  // calculating volatility
  const mean_profitlossrate = ret.profitlossrate / duration;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].position === 'sell') {
      const diff = history[i].profitlossrate - mean_profitlossrate;
      ret.volatility += diff * diff;
    }
  }
  if (countTotalPL > 0)
    ret.volatility = Math.sqrt(ret.volatility / countTotalPL);

  //normalize
  ret.profitloss = parseFloat(ret.profitloss.toFixed(1));
  ret.mean_waiting = parseFloat(ret.mean_waiting.toFixed(1));
  ret.mean_holding = parseFloat(ret.mean_holding.toFixed(1));
  ret.mean_trading_in_month = parseFloat(ret.mean_trading_in_month.toFixed(1));
  ret.volatility = parseFloat((ret.volatility * 100).toFixed(2));
  ret.max_profitlossrate = parseFloat(
    (ret.max_profitlossrate * 100).toFixed(2),
  );
  ret.min_profitlossrate = parseFloat(
    (ret.min_profitlossrate * 100).toFixed(2),
  );
  return ret;
}

export default analyzeHistory;
