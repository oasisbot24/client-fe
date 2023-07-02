import {NavLink} from 'react-router-dom';
import React from 'react';
import Icon from '@components/Basic/Icon';
import openLink from '@ipc/api/openLink';

interface MenuBoxProps {
  data: string;
}

const MenuBox: React.FC<MenuBoxProps> = props => {
  const menus = {
    DashBoard: {
      title: 'Dashboard',
      icon: 'icon/dashboard.png',
      isLink: true,
      link: '/',
    },
    Setting: {
      title: 'Setting',
      icon: 'icon/setting.png',
      isLink: true,
      link: '/setting',
    },
    BackTest: {
      title: 'Back Test',
      icon: 'icon/backtest.png',
      isLink: true,
      link: '/backtest',
    },
    PointWallet: {
      title: 'Point Wallet',
      icon: 'icon/pointwallet.png',
      isLink: false,
      onClick: e => openLink('https://oasisbot24.com/'),
    },
    Contact: {
      title: '텔레그램 문의하기',
      icon: 'icon/contact.png',
      isLink: false,
      onClick: e => openLink('https://t.me/OASISYOB'),
    },
  };
  return (
    <div className="MenuBox mb-4">
      <div className="boxBorder">
        <span>
          {menus[props.data].isLink === true ? (
            <NavLink
              to={menus[props.data].link}
              className={({isActive}) =>
                isActive ? 'fs-3 fw-500 p-4 active' : 'fs-3 fw-500 p-4'
              }
            >
              <div className="d-flex">
                <Icon className="me-4" src={menus[props.data].icon} />
                <p> {menus[props.data].title} </p>
              </div>
              <p className="d-none">•</p>
            </NavLink>
          ) : (
            <div
              onClick={menus[props.data].onClick}
              className="box-item fs-3 fw-500 p-4"
            >
              <div className="d-flex">
                <Icon className="me-4" src={menus[props.data].icon} />
                <p> {menus[props.data].title} </p>
              </div>
              <p className="d-none">•</p>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default MenuBox;
