import channel from '@channel';

const loginSubmit = data => {
  const {ipcRenderer} = window.require('electron');
  return new Promise((resolve, reject) => {
    ipcRenderer.once(channel.member.login, (event, res) => {
      reject(res);
    });
    ipcRenderer.send(channel.member.login, data);
  });
};

export default loginSubmit;
