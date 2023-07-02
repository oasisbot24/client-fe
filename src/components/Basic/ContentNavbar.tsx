import React from 'react';
import '@scss/ContentNavbar.scss';

interface Props {
  className?: string;
  index: number;
  setIndex: Function;
  list: string[];
}

const ContentNavbar: React.FC<Props> = ({index, setIndex, list, className}) => {
  const onClick = e => {
    const id = e.target.id;
    setIndex(id);
  };
  return (
    <div className={'ContentNavbar d-flex content-justify ' + className}>
      {list.map((value, index) => {
        return (
          <div
            key={index}
            className={'nav-item ' + (index == index ? 'active' : '')}
            onClick={onClick}
          >
            <p id={index.toString()}> {value} </p>
          </div>
        );
      })}
    </div>
  );
};

export default ContentNavbar;
