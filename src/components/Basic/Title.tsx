import {ReactNode} from 'react';
import React from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Title: React.FC<Props> = ({children, className}) => {
  return (
    <div className={'fw-600 ' + className}>
      <p> {children} </p>
    </div>
  );
};

export default Title;
