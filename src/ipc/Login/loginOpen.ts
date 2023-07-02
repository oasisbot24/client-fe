import channel from '@ipc/channel';

const loginOpen = () => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.send(channel.account.signin.open);
};

export default loginOpen;
