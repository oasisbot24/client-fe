import React from 'react';

interface Props {
  className?: string;
  content: string;
  contentclass?: string;
}

const Error: React.FC<Props> = (props: Props) => {
  if (props.content !== '') {
    return (
      <div className={'d-flex ' + (props.className ?? '')}>
        <div className={'ms-auto error ' + (props.contentclass ?? '')}>
          <p> {props.content} </p>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default Error;
