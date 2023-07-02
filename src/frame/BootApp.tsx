import '@scss/BootApp.scss';
import '@scss/default_class.scss';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const BootApp: React.FC<Props> = ({children}) => {
  return (
    <div className="BootApp p-1 d-flex-column">
      <div className="mt-4 d-flex justify-content-center">
        <img className="logo" src="update_small.png" alt="update" />
      </div>
      <hr className="my-2 bg-white"></hr>
      {children}
    </div>
  );
};

export default BootApp;
