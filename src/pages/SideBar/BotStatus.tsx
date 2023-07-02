import React from 'react';
import {useState, useEffect} from 'react';
import sidebarCreate from '@ipc/Sidebar/sidebarCreate';
import sidebarDestroy from '@ipc/Sidebar/sidebarDestroy';

const BotStatus: React.FC = () => {
  const [sidebarState, setSidebarState] = useState({
    isRunning: false,
    account: null,
    profitCutRate: 0,
    lossCutRate: 0,
  });
  useEffect(() => {
    sidebarCreate(setSidebarState);
    return () => {
      sidebarDestroy();
    };
  }, []);
  return (
    <div
      className={
        'BotStatus text-end ' +
        (sidebarState.isRunning === true ? 'text-plus' : 'text-gray-300')
      }
    >
      <p> {sidebarState.isRunning === true ? 'Now Running' : 'Now Stopped'} </p>
    </div>
  );
};

export default BotStatus;
