import oasisbotStart from '@ipc/Oasisbot/oasisbotStart';
import oasisbotStop from '@ipc/Oasisbot/oasisbotStop';
import OasisbotInputInterface from '@interface/input/OasisbotInputInterface';
import {OasisbotError} from '@reducers/oasisbot/error';

const oasisbotSubmit = (
  e,
  isRunning: boolean,
  oasisbotInput: OasisbotInputInterface,
  bankname: string,
): OasisbotError | null => {
  e.preventDefault();
  if (isRunning === false) {
    console.log('봇 시작');

    const initError: OasisbotError = {
      preset: '',
      startBalance: '',
      oasisbot: '',
    };

    if (oasisbotInput.preset === undefined) {
      console.log('프리셋 에러');
      initError.preset = '프리셋을 선택해주세요';
      return initError;
    }
    if (
      bankname === 'Upbit' &&
      oasisbotInput.longStartBalance < 10000 &&
      oasisbotInput.shortStartBalance < 10000
    ) {
      console.log('시작잔고 에러');
      initError.startBalance = '시작잔고를 10000원 이상으로 설정해주세요';
      return initError;
    }
    if (
      (bankname === 'Lbank' || bankname === 'okx') &&
      oasisbotInput.longStartBalance < 10 &&
      oasisbotInput.shortStartBalance < 10
    ) {
      console.log('시작잔고 에러');
      initError.startBalance = '시작잔고를 10원 이상으로 설정해주세요';
      return initError;
    }
    oasisbotStart(oasisbotInput);
  } else oasisbotStop();
};

export default oasisbotSubmit;
