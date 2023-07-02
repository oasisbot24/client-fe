import {ReactNode} from 'react';
import React from 'react';

interface Props {
  hasTag?: boolean;
  children?: ReactNode;
  className?: string;
  title: string;
  titleclass?: string;
  content?: string;
  contentclass?: string;
}

const Label: React.FC<Props> = props => {
  let Content: ReactNode = props.children;
  if (!props.hasTag) {
    Content = <p className={props.contentclass}> {props.content} </p>;
  }
  return (
    <div
      className={'d-flex justify-content-between ' + (props.className ?? '')}
    >
      <p className={props.titleclass ? props.titleclass : 'fw-700'}>
        {' '}
        {props.title}{' '}
      </p>
      {Content}
    </div>
  );
};

export default Label;
