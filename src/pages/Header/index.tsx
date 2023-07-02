import '@scss/Header.scss';
import React from 'react';
import Information from './Information';
import Topbar from './Topbar';

const Header: React.FC = () => {
  return (
    <div className="Header">
      <Topbar />
      <Information />
    </div>
  );
};

export default Header;
