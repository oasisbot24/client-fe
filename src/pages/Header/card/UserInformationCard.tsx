import React from 'react';
import Icon from '@components/Basic/Icon';

interface Props {
  className?: string;
  title: string;
  content: string;
  src: string;
}

const UserInformationCard: React.FC<Props> = props => {
  return (
    <div className={'UserInformationCard card w-100 py-4 ' + props.className}>
      <div className="d-flex justify-content-between">
        <div>
          <p className="fs-5 fw-400">{props.title}</p>
          <p className="fs-2 fw-600">{props.content}</p>
        </div>
        <Icon src={props.src} />
      </div>
    </div>
  );
};

export default UserInformationCard;
