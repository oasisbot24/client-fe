import '@scss/SideBar.scss';
import React from 'react';
import MenuBox from './MenuBox';
import BotButton from './BotButton';

const SideBar: React.FC = () => {
  return (
    <div className="SideBar h-100 p-2">
      <div>
        <div className="logo mb-1">
          <img src="new_logo.png" alt="new_logo" />
        </div>
        <MenuBox data="DashBoard" />
        <BotButton />
        <MenuBox data="Setting" />
        <MenuBox data="BackTest" />
        <MenuBox data="Contact" />
      </div>
      {/* <MenuBox data="Community"/> */}
    </div>
  );
};

export default SideBar;
