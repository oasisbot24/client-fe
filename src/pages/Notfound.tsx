import '@scss/Notfound.scss';
import React from 'react';

const Notfound: React.FC = () => {
  return (
    <div className="Notfound text-center pt-1 d-flex-column">
      <div className="image my-1">
        <img src="icon/notfound.png" alt="Notfound" />
      </div>
      <div className="fs-1 fw-500 my-1">
        <p> 개발중인 기능입니다 </p>
      </div>
    </div>
  );
};

export default Notfound;
