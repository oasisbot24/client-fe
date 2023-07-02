import React from 'react';
import '@scss/TitleBar.scss';
import windowMaximize from '@ipc/Titlebar/windowMaximize';
import windowClose from '@ipc/Titlebar/windowClose';
import windowMinimize from '@ipc/Titlebar/windowMinimize';
import windowUnmaximize from '@ipc/Titlebar/windowUnmaximize';
import {useState} from 'react';

interface Props {
  win: string;
}

const TitleBar: React.FC<Props> = ({win}) => {
  const [isMaximize, setMaximize] = useState(false);

  const maximizeClick = e => {
    if (isMaximize) {
      windowUnmaximize();
    } else {
      windowMaximize();
    }
    setMaximize(!isMaximize);
  };

  const minimizeClick = e => {
    windowMinimize();
  };

  const closeClick = e => {
    windowClose(win);
  };
  return (
    <div className="titleBar">
      <div className="titleOther drag"></div>
      <div className="d-flex h-100">
        {win === 'main' ? (
          <div className="d-flex">
            <button className="titleButton" onClick={minimizeClick}>
              <img src="icon/minimize.png" alt="mini"></img>
            </button>
            <button className="titleButton" onClick={maximizeClick}>
              <img
                src={isMaximize ? 'icon/unmaximize.png' : 'icon/maximize.png'}
                alt="maxi"
              ></img>
            </button>
          </div>
        ) : (
          <></>
        )}
        <button className="titleButton titleCloseButton" onClick={closeClick}>
          <img src="icon/close.png" alt="close"></img>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
