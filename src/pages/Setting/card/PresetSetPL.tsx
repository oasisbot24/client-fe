import Error from '@components/Basic/Error';
import Label from '@components/Basic/Label';
import PresetInterface from '@interface/PresetInterface';
import {RootState} from '@reducers/index';
import {actions} from '@reducers/setting/index';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function PresetSetPL({error}: {error: string}) {
  const {presetData} = useSelector((state: RootState) => ({
    presetData: state.setting.presetData,
  }));

  const dispatch = useDispatch();
  const setPresetData = (preset: PresetInterface) =>
    dispatch(actions.setPresetData(preset));

  const onBlur = e => {
    const {value, name} = e.target;
    if (name === 'profitCutRate' || name === 'lossCutRate') {
      let newPreset = {...presetData};
      if (isNaN(parseFloat(value))) newPreset[name] = 0;
      else if (name === 'profitCutRate' && parseFloat(value) < 0)
        newPreset[name] = 0;
      else if (name === 'lossCutRate' && parseFloat(value) > 0)
        newPreset[name] = 0;
      else newPreset[name] = parseFloat(value);
      setPresetData(newPreset);
    }
  };

  const onChangePresetData = e => {
    const {value, name} = e.target;
    let newPreset = {...presetData};
    newPreset[name] = value;
    setPresetData(newPreset);
  };

  return (
    <>
      <Label className="fs-5 mb-3" title="익절 / 손절율" />
      <Label className="mb-4" title="익절율 (%)" titleclass="fw-500" hasTag>
        <input
          name="profitCutRate"
          value={presetData.profitCutRate}
          onChange={onChangePresetData}
          onBlur={onBlur}
        ></input>
      </Label>
      <Label className="mb-4" title="손절율 (%)" titleclass="fw-500" hasTag>
        <input
          name="lossCutRate"
          value={presetData.lossCutRate}
          onChange={onChangePresetData}
          onBlur={onBlur}
        ></input>
      </Label>
      <Error content={error} />
    </>
  );
}
