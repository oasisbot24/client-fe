import '@scss/Setting.scss';
import React from 'react';
import PresetCard from './card/PresetCard';
import IndicatorCard from './card/IndicatorCard';
import {useState} from 'react';
import PresetListCard from './card/PresetListCard';

const Setting: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div className="Setting">
      {/* <Title className="text-blue-400 fs-2 mb-3">Preset</Title> */}
      <div className="mb-3">
        <PresetListCard />
      </div>
      <div className="d-flex">
        <div className="w-33 me-4">
          <PresetCard isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
        </div>
        <div className="w-66 ms-4">
          <IndicatorCard isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
        </div>
      </div>
    </div>
  );
};

export default Setting;
