import React from 'react';
import {NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Icon from '@components/Basic/Icon';
import sidebarCreate from '@ipc/Sidebar/sidebarCreate';
import sidebarDestroy from '@ipc/Sidebar/sidebarDestroy';

const BoxButton: React.FC = () => {
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
    <div>
      <div className="MenuBox">
        <div
          className={
            'mb-4 ' +
            (sidebarState.isRunning === true ? 'runningBox' : 'boxBorder')
          }
        >
          <span>
            <NavLink
              to={'/oasisbot'}
              className={({isActive}) =>
                isActive
                  ? 'fs-3 fw-500 text-black p-4 active'
                  : 'fs-3 fw-500 text-black p-4'
              }
            >
              <div className="d-flex">
                <Icon className="me-4" src={'icon/oasisbot.png'} />
                <p> OASIS BOT </p>
              </div>
              <p className="d-none">•</p>
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoxButton;
