import {configureStore} from '@reduxjs/toolkit';
import oasisbotReducer from './oasisbot';
import backtestReducer from './backtest';
import dashboardReducer from './dashboard';
import commonReducer from './common';
import settingReducer from './setting';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    oasisbot: oasisbotReducer,
    backtest: backtestReducer,
    common: commonReducer,
    setting: settingReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
