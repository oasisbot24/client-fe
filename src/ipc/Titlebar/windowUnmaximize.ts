import channel from '@channel';

const windowUnmaximize = () => {
  const {ipcRenderer} = window.require('electron');
  //console.log(data);
  ipcRenderer.send(channel.window.unmaximize);
};

export default windowUnmaximize;
