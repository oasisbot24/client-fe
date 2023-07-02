import '@scss/PopupApp.scss';
import '@scss/default_class.scss';
import React from 'react';
import TitleBar from '@components/Basic/TitleBar';

interface Props {
  winname: string;
  children: React.ReactNode;
}

const BootApp: React.FC<Props> = ({winname, children}) => {
  return (
    <div className="PopupApp pt-3">
      <TitleBar win={winname} />
      <div className="p-1">{children}</div>
    </div>
  );
};

export default BootApp;
