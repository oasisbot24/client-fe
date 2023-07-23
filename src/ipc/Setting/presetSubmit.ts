import PresetInterface from '@interface/PresetInterface';
import savePreset from '@ipc/Setting/preset/savePreset';

const presetSubmit = (
  e,
  presetData: PresetInterface,
  setSubmitted: Function,
  setError: Function,
) => {
  e.preventDefault();
  setError('');
  if (presetData.profitCutRate <= 0) {
    return setError('수익률은 0보다 커야합니다.');
  } else if (presetData.lossCutRate >= 0) {
    return setError('손절률은 0보다 작아야합니다.');
  }
  savePreset(presetData);
  setSubmitted(true);
};

export default presetSubmit;
