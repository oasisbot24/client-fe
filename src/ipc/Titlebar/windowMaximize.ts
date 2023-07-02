import channel from '@ipc/channel';

const windowMaximize = () => {
  const {ipcRenderer} = window.require('electron');
  console.log('maximize!');
  ipcRenderer.send(channel.window.maximize);
};

export default windowMaximize;
