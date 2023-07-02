import React from 'react';

interface Props {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  optionList: string[];
}

const CommonPreset: React.FC<Props> = ({name, onChange, optionList}) => {
  return (
    <select name={name} onChange={onChange}>
      {optionList.map((preset, index) => (
        <option key={index} value={preset}>
          {preset}
        </option>
      ))}
    </select>
  );
};

export default CommonPreset;
