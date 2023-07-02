import bankSelect from '@ipc/Bankselect/bankSelect';
import React from 'react';
import {useState} from 'react';
import openLink from '@ipc/api/openLink';

const Bankselect: React.FC = () => {
  const [isHide, setisHide] = useState(true);
  const [isSelect, setisSelect] = useState(false);
  const [bank, setbank] = useState('Nothing');

  const selectorClick = e => {
    setisHide(!isHide);
  };

  const optionClick = e => {
    setisSelect(true);
    setisHide(!isHide);
    let selectedbank = e.currentTarget.id;
    console.log('select bank : ' + selectedbank);
    setbank(selectedbank);
  };

  return (
    <div className="selector d-flex-column h-100">
      <div className="selectField mb-3 fw-600" onClick={selectorClick}>
        <p>{isSelect ? bank : '거래 은행을 선택하세요'}</p>
        <img src="arrow.png" alt="arrow"></img>
      </div>
      <ul className={'list fw-500 ' + (isHide ? 'hide' : 'show')}>
        <li className="options" id="LBank" onClick={optionClick}>
          <img src="lbank.png" alt="lbank"></img>
          <p>LBank / 엘뱅크</p>
        </li>
        <li className="options" id="UpBit" onClick={optionClick}>
          <img src="upbit.png" alt="upbit"></img>
          <p>UpBit / 업비트</p>
        </li>
      </ul>
      <button
        className={'submit ' + (isSelect && isHide ? 'show' : 'hide')}
        onClick={e => bankSelect(e, bank)}
      >
        <b>{bank} 로 접속하기</b>
      </button>
      {bank === 'LBank' && isHide && (
        <div>
          <div className="text-white mt-4">
            <p className="fs-6 fw-500">
              <span className="text-sell">접속하기 전 잠시만요!</span> 아래의
              레퍼럴 코드로 LBank를 이용하시면 수수료 할인 혜택이 적용됩니다.
            </p>
          </div>
          <button
            className="referral fs-6 mt-4"
            onClick={e =>
              openLink('https://www.lbank.com/invitevip?icode=1N824')
            }
          >
            <b>{bank} 레퍼럴 링크</b>
          </button>
        </div>
      )}
    </div>
  );
};

export default Bankselect;
