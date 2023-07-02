import CommonSelect from '@components/Select/CommonSelect';
import {RootState} from '@reducers/index';
import React from 'react';
import {useSelector} from 'react-redux';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PresetSelect: React.FC<Props> = ({onChange}) => {
  const {presetList} = useSelector((state: RootState) => ({
    presetList: state.common.file.presetList,
  }));

  return (
    <CommonSelect name="preset" onChange={onChange} optionList={presetList} />
  );
};

export default PresetSelect;
