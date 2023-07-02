import React from 'react';
import UserInformationCard from './card/UserInformationCard';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';

const Information: React.FC = () => {
  const {bank, user} = useSelector((state: RootState) => ({
    bank: state.common.bank,
    user: state.common.user,
  }));
  const [point, setPoint] = useState('로그인이 필요합니다.');

  useEffect(() => {
    if (user.id !== -1) {
      setPoint(user.point.toFixed(2));
    }
  }, [bank.balance, user]);

  return (
    <div className="Information d-flex mb-3">
      <UserInformationCard
        className="me-4"
        title="Account"
        content={
          bank.balance + (isNaN(Number(bank.balance)) ? '' : bank.currency)
        }
        src="icon/account.png"
      />
      <UserInformationCard
        className="ms-4"
        title="Point"
        content={isNaN(Number(point)) ? point : point + ' OASIS'}
        src="icon/pointwallet.png"
      />
    </div>
  );
};

export default Information;
