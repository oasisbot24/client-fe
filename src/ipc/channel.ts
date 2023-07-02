const channel = {
  sidebar: 'sidebar',
  version: 'version',
  update: {
    log: 'update_log',
    progress: 'update_progress',
  },
  dashboard: {
    gethistory: 'dashboard_history',
    getpatchnote: 'dashboard_getpatchnote',
  },
  oasisbot: {
    status: {
      getstate: 'oasisbot_status_getstate',
      getinput: 'oasisbot_status_getinput',
      gethistory: 'oasisbot_status_gethistory',
    },
    buy: 'oasisbot_buy',
    sell: 'oasisbot_sell',
    running: 'oasisbot_running',
    start: 'oasisbot_start',
    stop: 'oasisbot_stop',
    error: 'oasisbot_error',
  },
  setting: {
    preset: {
      isvalid: 'setting_preset_isvalid',
      get: 'setting_preset_get',
      getlist: 'setting_preset_getlist',
      save: 'setting_preset_save',
    },
    indicator: {
      get: 'setting_indicator_get',
      getframe: 'setting_indicator_getframe',
      getlist: 'setting_indicator_getlist',
    },
  },
  bankselect: {
    bank: {
      select: 'bankselect_bank_select',
    },
  },
  backtest: {
    status: {
      getstate: 'backtest_status_getstate',
      getinput: 'backtest_status_getinput',
      gethistory: 'backtest_status_gethistory',
    },
    running: 'backtest_running',
    progress: 'backtest_progress',
    start: 'backtest_start',
    stop: 'backtest_stop',
  },
  api: {
    exchange: {
      getname: 'api_exchange_getname',
    },
    coin: {
      getlist: 'api_coin_getlist',
      getticker: 'api_coin_getticker',
      gettickerWS: 'api_coin_gettickerWS',
    },
    account: {
      get: 'api_account_get',
    },
    keys: {
      open: 'api_keys_open',
      close: 'api_keys_close',
      get: 'api_keys_get',
      save: 'api_keys_save',
    },
  },
  account: {
    signin: {
      open: 'account_signin_open',
      close: 'account_signin_close',
      submit: 'account_signin_submit',
    },
    user: {
      get: 'account_user_get',
    },
    transaction: {
      get: 'account_transaction_get',
    },
    usdt_to_krw: {
      get: 'account_usdt_to_krw_get',
    },
  },
  window: {
    minimize: 'window_minimize',
    unmaximize: 'window_unmaximize',
    maximize: 'window_maximize',
    close: 'window_close',
  },
  cache: 'cache',
};

export default channel;
