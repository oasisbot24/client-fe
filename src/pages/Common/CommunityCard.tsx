import '@scss/Table.scss';
import React from 'react';
import ContentNavbar from '@components/Basic/ContentNavbar';
import {useState} from 'react';

const CommunityCard: React.FC = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="CommunityCard card">
      <ContentNavbar
        list={['공지사항', '코인게시판']}
        index={index}
        setIndex={setIndex}
      />
      <div className="d-flex justify-content-center mt-1">
        <div className="image w-33 my-1">
          <img src="icon/notfound.png" alt="Notfound" />
        </div>
      </div>
      <div className="fs-2 fw-500 text-center">
        <p> 개발중인 기능입니다 </p>
      </div>
      {/*
      <table>
        <tbody>
          <tr className="table_cell py-3 d-flex-column">
            <div className="d-flex justify-content-between mb-3">
              <td className="title"> OASIS 4차 공지사항 </td>
              <td className="author"> OASIS </td>
              <td className="date"> 2022.07.28 </td>
            </div>
            <div className="text-gray-300">
              안녕하세요 OASIS 입니다. 지속되는 하락장이 유지되는 가운데, 지속적인 수익이 발생하시는 분을 찾고 있습니다. 추첨을 통하여 상품 또한...
            </div>
          </tr>
          <tr className="table_cell py-3">
            <td className="title"> OASIS 긴급 공지사항 </td>
            <td className="author"> OASIS </td>
            <td className="date"> 2022.06.21 </td>
          </tr>
          <tr className="table_cell py-3">
            <td className="title"> OASIS 3차 공지사항 </td>
            <td className="author"> OASIS </td>
            <td className="date"> 2022.05.08 </td>
          </tr>
          <tr className="table_cell py-3">
            <td className="title"> OASIS 2차 공지사항 </td>
            <td className="author"> OASIS </td>
            <td className="date"> 2022.03.11 </td>
          </tr>
          <tr className="table_cell py-3">
            <td className="title"> OASIS 1차 공지사항 </td>
            <td className="author"> OASIS </td>
            <td className="date"> 2022.01.22 </td>
          </tr>
          <tr className="table_cell py-3">
            <td className="title"> OASIS 사용 안내 </td>
            <td className="author"> OASIS </td>
            <td className="date"> 2022.01.08 </td>
          </tr>
          <tr className="table_cell py-3">
            <td className="title"> OASIS 수수료 정책 </td>
            <td className="author"> OASIS </td>
            <td className="date"> 2022.01.08 </td>
          </tr>
          <tr className="table_cell py-3">
            <td className="title"> OASIS 란? </td>
            <td className="author"> OASIS </td>
            <td className="date"> 2022.01.08 </td>
          </tr>
        </tbody>
      </table>
      */}
    </div>
  );
};

export default CommunityCard;
