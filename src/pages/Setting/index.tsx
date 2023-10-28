import '@scss/Setting.scss';
import React, {useState} from 'react';
import PresetCard from './card/PresetCard';
import PresetListCard from './card/PresetListCard';

const Setting: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div className="Setting">
      <div className="mb-3">
        <PresetListCard />
      </div>
      <div className="">
        <PresetCard isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
      </div>
    </div>
  );
};

export default Setting;
