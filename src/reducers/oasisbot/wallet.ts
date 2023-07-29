import WalletInterface from '@interface/WalletInterface';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initWallet: WalletInterface = {
  assets: 0,
  cash: 0,
  coin: {type: '', balance: 0, volume: 0},
};

/* Slice */
const oasisbotWalletSlice = createSlice({
  name: 'oasisbotWallet',
  initialState: initWallet,
  reducers: {
    setWallet: (state, action: PayloadAction<WalletInterface>) => {
      return action.payload;
    },
  },
});

export default oasisbotWalletSlice;
