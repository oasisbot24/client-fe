import channel from '@channel';

const windowMinimize = () => {
  const {ipcRenderer} = window.require('electron');
  //console.log(data);
  ipcRenderer.send(channel.window.minimize);
};

export default windowMinimize;
