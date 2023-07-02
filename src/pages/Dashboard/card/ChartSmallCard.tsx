import React from 'react';
import LineChart from '@components/Chart/LineChart';

interface Props {
  title: string;
  currentPrice: string;
  currentRate: string;
  src: string;
}

const ChartSmallCard: React.FC<Props> = props => {
  let rateClass: string;
  if (props.currentRate[0] === '+') {
    rateClass = 'plus';
  } else {
    rateClass = 'minus';
  }

  return (
    <div className="ChartSmallCard card">
      <div>
        <p>{props.title}</p>
        <div className="d-flex">
          <p className="fs-2 fw-600 me-4">{props.currentPrice}</p>
          <p className={rateClass}>{props.currentRate}</p>
        </div>
      </div>
      <LineChart className="mt-auto" src={props.src} />
    </div>
  );
};

export default ChartSmallCard;
