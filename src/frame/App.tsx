import '@scss/App.scss';
import '@scss/default_class.scss';
import React from 'react';
import {useState} from 'react';
import SideBar from '@pages/SideBar';
import Header from '@pages/Header';
import TitleBar from '@components/Basic/TitleBar';

interface Props {
  children: React.ReactNode;
}

const App: React.FC<Props> = ({children}) => {
  const [sideHide, setsideHide] = useState(false);
  const toggleClick = e => {
    setsideHide(!sideHide);
  };

  return (
    <div>
      <TitleBar win="main" />
      <div className="App h-100">
        <div className={'side ' + (sideHide ? 'hide' : 'show')}>
          <SideBar />
          <div
            className={'toggle ' + (sideHide ? 'hide' : 'show')}
            onClick={toggleClick}
          >
            <img
              src="icon/arrow.png"
              className={'arrow ' + (sideHide ? 'hide' : 'show')}
              alt="arrow"
            ></img>
          </div>
        </div>
        <div className={'main p-1 ms-auto ' + (sideHide ? 'hide' : 'show')}>
          <Header />
          <div className="Content d-flex-column">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
