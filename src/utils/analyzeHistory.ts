import AnalyzeHistory from '@interface/history/HistoryAnalyze';
import BacktestInputInterface from '@interface/input/BacktestInputInterface';
import HistoryTrade from '@interface/history/HistoryTrade';

function analyzeHistory(
  history: HistoryTrade[],
  input?: BacktestInputInterface,
) {
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
  if (
    history.length === 0 ||
    (input?.shortStartBalance === 0 && input?.longStartBalance === 0)
  )
    return ret;

  let startDate: Date, endDate: Date;
  if (input !== undefined) {
    ret.startaccount = input.shortStartBalance + input.longStartBalance;
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

  let long_openDate: Date | null = null;
  let long_closeDate: Date | null = null;
  let long_duration: number | null = null;
  let short_openDate: Date | null = null;
  let short_closeDate: Date | null = null;
  let short_duration: number | null = null;
  for (let i = 0; i < history.length; i++) {
    if (history[i].posSide === 'long') {
      if (history[i].position === 'buy') {
        if (long_openDate !== null) {
          long_openDate = new Date(history[i].date);
          if (long_closeDate !== null) {
            long_duration =
              (long_openDate.getTime() - long_closeDate.getTime()) /
              (1000 * 60 * 60);
            long_closeDate = null;

            // add waiting duration
            countWaiting++;
            durationWaiting += long_duration ?? 0;
          }
        }
      }
      if (history[i].position === 'sell') {
        long_closeDate = new Date(history[i].date);
        if (long_openDate !== null)
          long_duration =
            (long_closeDate.getTime() - long_openDate.getTime()) /
            (1000 * 60 * 60);
        long_openDate = null;

        // add holding duration
        countHolding++;
        durationHolding += long_duration ?? 0;

        // caculating pl
        countTotalPL++;
        if (history[i].profitloss > 0) countProfit++;
        if (history[i].type in ret.tradecoin)
          ret.tradecoin[history[i].type] += 1;
        else ret.tradecoin[history[i].type] = 1;
      }
    } else {
      if (history[i].position === 'buy') {
        if (short_openDate !== null) {
          short_openDate = new Date(history[i].date);
          if (short_closeDate !== null) {
            short_duration =
              (short_openDate.getTime() - short_closeDate.getTime()) /
              (1000 * 60 * 60);
            short_closeDate = null;

            // add waiting duration
            countWaiting++;
            durationWaiting += short_duration ?? 0;
          }
        }
      }
      if (history[i].position === 'sell') {
        short_closeDate = new Date(history[i].date);
        if (short_openDate !== null)
          short_duration =
            (short_closeDate.getTime() - short_openDate.getTime()) /
            (1000 * 60 * 60);
        short_openDate = null;

        // add holding duration
        countHolding++;
        durationHolding += short_duration ?? 0;

        // caculating pl
        countTotalPL++;
        if (history[i].profitloss > 0) countProfit++;
        if (history[i].type in ret.tradecoin)
          ret.tradecoin[history[i].type] += 1;
        else ret.tradecoin[history[i].type] = 1;
      }
    }

    ret.profitloss += history[i].profitloss ?? 0;
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
        ret.profitlossrate += history[i].profitlossrate ?? 0;
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
      const diff = (history[i].profitlossrate ?? 0) - mean_profitlossrate;
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
