import React from 'react';
import UserInformationCard from './card/UserInformationCard';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';

const Information: React.FC = () => {
  const {bank} = useSelector((state: RootState) => ({
    bank: state.common.bank,
  }));

  return (
    <div className="Information d-flex mb-3">
      <UserInformationCard
        title="Account"
        content={
          bank.balance + (isNaN(Number(bank.balance)) ? '' : bank.currency)
        }
        src="icon/account.png"
      />
    </div>
  );
};

export default Information;
