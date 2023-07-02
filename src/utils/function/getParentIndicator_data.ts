import ParentIndicator_Data from '@interface/ParentIndicator_Data';

const getParentIndicator_data = () => {
  const ret: ParentIndicator_Data = {
    title: '보조지표 선택',
    setting: {
      coin_type: {
        name: '기준코인',
        value: '',
      },
      standard_minute: {
        name: '기준분봉',
        value: 1,
      },
    },
    weight: {},
  };
  return ret;
};

export default getParentIndicator_data;
