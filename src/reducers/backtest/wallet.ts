import WalletInterface from '@interface/WalletInterface';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/* init Action */
const initWallet: WalletInterface = {
  long_wallet: {
    assets: 0,
    cash: 0,
    coin: {type: '', balance: 0, volume: 0},
  },
  short_wallet: {
    assets: 0,
    cash: 0,
    coin: {type: '', balance: 0, volume: 0},
  },
};

/* Slice */
const backtestWalletSlice = createSlice({
  name: 'backtestWallet',
  initialState: initWallet,
  reducers: {
    setWallet: (state, action: PayloadAction<WalletInterface>) => {
      return action.payload;
    },
  },
});

export default backtestWalletSlice;
