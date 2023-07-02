import React from 'react';
import '@scss/Chart.scss';
import Title from '@components/Basic/Title';
import Label from '@components/Basic/Label';

interface Props {
  title: string;
  className?: string;
  src: string;
  data: {[keys: string]: number};
}

const CircleChart: React.FC<Props> = (props: Props) => {
  return (
    <div className={'circlechart ' + props.className}>
      <Title className="mb-5">{props.title}</Title>
      <div className="d-flex">
        {/* <div className="chart me-3">
          <img src={props.src} alt='chart'/>
        </div> */}
        <div className="flex-grow-1 mb-auto">
          {Object.keys(props.data).map((key, index) => (
            <Label
              key={index}
              className="label"
              title={key}
              content={Math.round(props.data[key] * 100) + '%'}
              titleclass="fw-400"
              contentclass="fs-3 fw-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircleChart;
