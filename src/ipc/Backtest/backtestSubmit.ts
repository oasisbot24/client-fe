import BacktestInputInterface from '@interface/input/BacktestInputInterface';
import backatestStart from '@ipc/Backtest/backtestStart';
import backatestStop from '@ipc/Backtest/backtestStop';
import getPresetIsValid from '@ipc/Setting/preset/getPresetIsValid';

const isDate = date => {
  var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  return regex.test(date);
};

const isValidInput = async (
  input: BacktestInputInterface,
  bankname: string,
  setError: Function,
) => {
  const isvalid = await getPresetIsValid(input.preset);
  let initError = {
    preset: '',
    startBalance: '',
    startDate: '',
    endDate: '',
  };
  if (!isvalid) {
    initError.preset = '손상된 프리셋입니다';
    setError(initError);
    return false;
  }
  if (bankname === 'Upbit' && input.startBalance < 10000) {
    setError(prev => {
      let current = {...prev};
      current.startBalance = '시작잔고를 1만원 이상으로 설정해주세요';
      return current;
    });
    return false;
  }
  if (bankname === 'Lbank' && input.startBalance < 10) {
    setError(prev => {
      let current = {...prev};
      current.startBalance = '시작잔고를 10$ 이상으로 설정해주세요';
      return current;
    });
    return false;
  }
  if (!isDate(input.startDate)) {
    initError.startDate = '올바르지 않은 날짜입니다';
    setError(initError);
    return false;
  }
  if (!isDate(input.endDate)) {
    initError.endDate = '올바르지 않은 날짜입니다';
    setError(initError);
    return false;
  }
  setError(initError);
  return true;
};

const backtestSubmit = async (
  e,
  isRunning: boolean,
  backtestInput: BacktestInputInterface,
  bankname: string,
  setError: Function,
) => {
  e.preventDefault();
  if (isRunning === false) {
    const isvalid = await isValidInput(backtestInput, bankname, setError);
    if (isvalid) {
      backatestStart(backtestInput);
    }
  } else backatestStop();
};

export default backtestSubmit;
