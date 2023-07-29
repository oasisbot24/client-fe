import oasisbotStart from '@ipc/Oasisbot/oasisbotStart';
import oasisbotStop from '@ipc/Oasisbot/oasisbotStop';
import OasisbotInputInterface from '@interface/input/OasisbotInputInterface';

const oasisbotSubmit = (
  e,
  isRunning: boolean,
  oasisbotInput: OasisbotInputInterface,
  bankname: string,
  setError: Function,
) => {
  e.preventDefault();
  if (isRunning === false) {
    console.log('봇 시작');

    if (oasisbotInput.preset === undefined) {
      console.log('프리셋 에러');
      setError(prev => {
        let current = {...prev};
        current.oasisbot = '프리셋을 선택해주세요';
        return current;
      });
      return;
    }
    if (bankname === 'Upbit' && oasisbotInput.startBalance < 10000) {
      console.log('시작잔고 에러');
      setError(prev => {
        let current = {...prev};
        current.startAccount = '시작잔고를 1만원 이상으로 설정해주세요';
        return current;
      });
      return;
    }
    if (bankname === 'Lbank' && oasisbotInput.startBalance < 10) {
      setError(prev => {
        console.log('시작 잔고 에러');
        let current = {...prev};
        current.startAccount = '시작잔고를 10$ 이상으로 설정해주세요';
        return current;
      });
      return;
    }
    setError({
      preset: '',
      startAccount: '',
      oasisbot: '',
    });
    oasisbotStart(oasisbotInput);
  } else oasisbotStop();
};

export default oasisbotSubmit;
