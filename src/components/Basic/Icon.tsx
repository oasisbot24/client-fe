import React from 'react';

interface Props {
  src: string;
  className?: string;
  width?: number;
  id?: string;
}

const Icon: React.FC<Props> = props => {
  const inlineStyle = {
    width: props.width === undefined ? '24px' : props.width + 'px',
    height: props.width === undefined ? '24px' : props.width + 'px',
  };
  return (
    <div className={props.className} id={props.id}>
      <i className="fw-600" style={inlineStyle}>
        <img src={props.src} alt="icon" />
      </i>
    </div>
  );
};

export default Icon;
