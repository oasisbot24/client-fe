import channel from '@ipc/channel';

const windowClose = (win: string) => {
  const {ipcRenderer} = window.require('electron');
  //console.log(data);
  if (win === 'main') ipcRenderer.send(channel.window.close);
  else if (win === 'keys') ipcRenderer.send(channel.api.keys.close);
  else if (win === 'signin') ipcRenderer.send(channel.account.signin.close);
};

export default windowClose;
