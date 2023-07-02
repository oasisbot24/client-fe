import React from 'react';
import LineChart from '@components/Chart/LineChart';
import ContentNavbar from '@components/Basic/ContentNavbar';
import {useState} from 'react';

const ChartBigCard: React.FC = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="ChartBigCard card">
      <ContentNavbar
        className="mb-3"
        list={['1달 누적 수익률', '3달 누적 수익률']}
        index={index}
        setIndex={setIndex}
      />
      <div className="mb-3">
        <p className="fs-1 fw-700"> +5.2% </p>
      </div>
      <LineChart className="mt-auto" src="linechart.png" />
    </div>
  );
};

export default ChartBigCard;
