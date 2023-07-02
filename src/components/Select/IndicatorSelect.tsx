import CommonSelect from '@components/Select/CommonSelect';
import {RootState} from '@reducers/index';
import React from 'react';
import {useSelector} from 'react-redux';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PresetSelect: React.FC<Props> = ({onChange}) => {
  const {indicatorList} = useSelector((state: RootState) => ({
    indicatorList: state.common.file.indicatorList,
  }));

  return (
    <CommonSelect
      name="indicator"
      onChange={onChange}
      optionList={indicatorList}
    />
  );
};

export default PresetSelect;
