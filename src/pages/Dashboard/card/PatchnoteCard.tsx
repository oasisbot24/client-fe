import '@scss/Table.scss';
import React from 'react';
import Title from '@components/Basic/Title';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';

const PatchnoteCard: React.FC = () => {
  const {patchnote} = useSelector((state: RootState) => ({
    patchnote: state.dashboard.patchnote,
  }));

  return (
    <div className="PatchnoteCard card">
      <Title className="fs-3"> 패치노트 </Title>
      <hr />
      <div dangerouslySetInnerHTML={{__html: patchnote}}></div>
    </div>
  );
};

export default PatchnoteCard;
