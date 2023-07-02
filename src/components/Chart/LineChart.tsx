import React from 'react';
import '@scss/Chart.scss';

interface Props {
  src: string;
  className?: string;
  title?: string;
  data?: string;
}

const LineChart: React.FC<Props> = props => {
  return (
    <div className={'LineChart ' + props.className}>
      <div className="chart">
        <img src={props.src} alt="chart" />
      </div>
    </div>
  );
};

export default LineChart;
