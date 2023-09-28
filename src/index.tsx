import React from 'react';
import ReactDOM from 'react-dom/client';
import '@scss/default.scss';
import './style/fonts/fonts.scss';
import App from './frame/App';
import BootApp from './frame/BootApp';
import PopupApp from './frame/PopupApp';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Update from '@pages/Boot/Update';
import Bankselect from '@pages/Boot/Bankselect';
import Api from '@pages/Popup/Api';
import Oasisbot from '@pages/Oasisbot';
import Dashboard from '@pages/Dashboard';
import Backtest from '@pages/Backtest';
import Setting from '@pages/Setting';
import Notfound from '@pages/Notfound';
import {Provider} from 'react-redux';
import store from './reducers';
import InitRedux from './InitRedux';
import Login from '@pages/Boot/Login';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <InitRedux />
    <HashRouter>
      <Routes>
        <Route
          path="/update"
          element={
            <BootApp>
              <Update />
            </BootApp>
          }
        />
        <Route
          path="/bankselect"
          element={
            <BootApp>
              <Bankselect />
            </BootApp>
          }
        />
        <Route
          path="/api"
          element={
            <PopupApp winname="keys">
              <Api />
            </PopupApp>
          }
        />
        <Route
          path="/login"
          element={
            <BootApp>
              <Login />
            </BootApp>
          }
        />
        <Route
          path="/"
          element={
            <App>
              <Dashboard />
            </App>
          }
        />
        <Route
          path="/oasisbot"
          element={
            <App>
              <Oasisbot />
            </App>
          }
        />
        <Route
          path="/backtest"
          element={
            <App>
              <Backtest />
            </App>
          }
        />
        <Route
          path="/setting"
          element={
            <App>
              <Setting />
            </App>
          }
        />
        <Route
          path="*"
          element={
            <App>
              <Notfound />
            </App>
          }
        />
      </Routes>
    </HashRouter>
  </Provider>,
);
