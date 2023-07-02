import React, {useState} from 'react';
import Label from '@components/Basic/Label';
import {useEffect} from 'react';
import {RootState} from '@reducers/index';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '@reducers/setting/index';
import getPresetData from '@ipc/Setting/preset/getPresetData';
import Preset from '@interface/Preset';
import Error from '@components/Basic/Error';
import getPresetList from '@ipc/Setting/preset/getPresetList';

const PresetListCard: React.FC = () => {
  const {presetData} = useSelector((state: RootState) => ({
    presetData: state.setting.presetData,
  }));

  const dispatch = useDispatch();
  const setPresetData = (state: Preset) =>
    dispatch(actions.setPresetData(state));

  const [presetList, setPresetList] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getPresetList(setPresetList, res => getPresetData(setPresetData, res[0]));
  }, []);

  useEffect(() => {
    if (presetData.isError) setError('손상된 프리셋입니다');
    else setError('');
  }, [presetData]);

  const onChangePreset = e => {
    getPresetData(setPresetData, e.target.value);
  };

  return (
    <div className="PresetListCard card">
      <Label title="프리셋 목록" titleclass="fs-3 fw-600" hasTag>
        <select name="preset" onChange={onChangePreset}>
          {presetList.map((preset, index) => (
            <option key={index} value={preset}>
              {preset}
            </option>
          ))}
        </select>
      </Label>
      <Error className="mt-4" content={error} />
    </div>
  );
};

export default PresetListCard;
