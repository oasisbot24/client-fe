import Title from '@components/Basic/Title';
import React from 'react';
import {useState, useEffect} from 'react';
import apiGet from '@ipc/api/apiGet';
import apiSave from '@ipc/api/apiSave';
import channel from '@channel';

const Api: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [bankname, setBankname] = useState('');

  const onChangeInput = e => {
    const {value, name} = e.target;
    if (name === 'accessKey') setAccessKey(value);
    if (name === 'secretKey') setSecretKey(value);
    if (name === 'passphrase') setPassphrase(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    apiSave({
      accessKey: accessKey,
      secretKey: secretKey,
      passphrase: passphrase,
    });
  };

  useEffect(() => {
    apiGet(setAccessKey, setSecretKey, setPassphrase); // setBank

    const {ipcRenderer} = window.require('electron');
    ipcRenderer.on(channel.api.exchange.getName, (event, res) => {
      setBankname(res);
    });
    ipcRenderer.send(channel.api.exchange.getName);
  }, []);

  return (
    <div>
      <Title className="text-blue-400 fs-2 mb-3"> API KEYS </Title>
      <div className="card">
        <form method="post" onSubmit={onSubmit}>
          <div className="mb-3">
            <Title className="fs-4 mb-5">Access Key</Title>
            <input
              name="accessKey"
              placeholder="Access Key"
              value={accessKey}
              onChange={onChangeInput}
            ></input>
          </div>
          <div className="mb-3">
            <Title className="fs-4 mb-5">Secret Key</Title>
            <input
              name="secretKey"
              placeholder="Secret Key"
              value={secretKey}
              onChange={onChangeInput}
            ></input>
          </div>
          {bankname === 'okx' && (
            <div className="mb-3">
              <Title className="fs-4 mb-5">PASSPHRASE</Title>
              <input
                name="passphrase"
                placeholder="passphrase"
                value={passphrase}
                onChange={onChangeInput}
              ></input>
            </div>
          )}
          <button className="w-100 btn-contained-blue" type="submit">
            <p> API KEYS 저장하기</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Api;
