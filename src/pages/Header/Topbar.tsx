import Title from '@components/Basic/Title';
import apiOpen from '@ipc/api/apiOpen';
import {RootState} from '@reducers/index';
import React from 'react';
import {useSelector} from 'react-redux';

const Topbar: React.FC = () => {
  const {version, usdtToKrw, bankname} = useSelector(
    (state: RootState) => ({
      version: state.common.info.version,
      usdtToKrw: state.common.info.usdtToKrw,
      bankname: state.common.bank.bankname,
    }),
  );
  return (
    <div className="Topbar d-flex justify-content-between mb-3">
      <div className="me-3 w-100 d-flex justify-content-between">
        <div className="notice d-flex">
          <Title className="text-blue-400 fs-2 me-2"> Notice </Title>
          <div className="text-gray">
            <p>Life is Trading. Enjoy your trade in OASIS!</p>
          </div>
        </div>
        <div className="version d-flex-column justify-content-between">
          <div className="my-auto">
            <p>Current Version : v{version}</p>
          </div>
          <div className="my-auto">
            <p>
              {usdtToKrw.date} 1 USDT : {usdtToKrw.krw.toFixed(2)} KRW
            </p>
          </div>
        </div>
      </div>
      <div className="user">
        <button className="btn btn-outlined-darkblue me-4" onClick={apiOpen}>
          <p> {bankname} 연결 </p>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
