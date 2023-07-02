import updateCreate from '@ipc/Update/updateCreate';
import updateDestroy from '@ipc/Update/updateDestroy';
import React from 'react';
import {useState, useEffect} from 'react';

const Update: React.FC = () => {
  const [log, setLog] = useState('업데이트 확인중입니다...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    updateCreate(setLog, setProgress);
    return () => {
      updateDestroy();
    };
  }, []);
  return (
    <div className="h-100 d-flex-column justify-content-between">
      <div className="log text-white">
        <p dangerouslySetInnerHTML={{__html: log}}></p>
      </div>
      <div className="progress">
        <progress max="10000" value={progress * 10000}></progress>
      </div>
    </div>
  );
};

export default Update;
