import channel from '@ipc/channel';

const loginSubmit = (data, setError: Function, setSubmitting: Function) => {
  const {ipcRenderer} = window.require('electron');
  ipcRenderer.once(channel.account.signin.submit, (event, res) => {
    console.log(res);
    setError(res);
    setSubmitting(false);
  });
  ipcRenderer.send(channel.account.signin.submit, data);
};

export default loginSubmit;
