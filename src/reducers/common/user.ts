import {UserType} from '@interface/api/backend/user';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initUser: UserType = {
  id: -1,
  email: '',
  password: '',
  phone: '',
  nick_name: '',
  point: 0,
  commission_rate: 10,
  nft: 0,
  type: 0,
};

/* Slice */
const commonFileSlice = createSlice({
  name: 'commonUser',
  initialState: initUser,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state = action.payload;
      return state;
    },
  },
});

export default commonFileSlice;
